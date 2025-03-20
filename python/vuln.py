#!/usr/bin/env python3
import json
import socket
import time
import logging
import asyncio
import websockets
from scapy.all import sniff, IP, TCP, ICMP, NBNSQueryRequest, NBNSQueryResponse, UDP, sr1
from collections import defaultdict
from ipaddress import ip_address, ip_network
from datetime import datetime
import threading

# Configuration du logger interne
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('ids_monitor')

# Configuration WebSocket
WEBSOCKET_SERVER = "ws://localhost:3001/"
websocket_connection = None

# Structure de données pour stocker les tentatives
http_attempts = defaultdict(list)
ssh_attempts = defaultdict(list)
ftp_attempts = defaultdict(list)

LOCAL_IP = "192.168.68.68"  # Remplace par ton IP locale
INTERNAL_IPS = ["192.168.1.0/24", "10.0.0.0/8", "172.16.0.0/12"]

# Détection et seuils
PORT_SCAN_THRESHOLD = 10
FLOOD_THRESHOLD = 200
PING_FLOOD_THRESHOLD = 100
SSH_BRUTE_FORCE_THRESHOLD = 5  # Nombre de tentatives max
SSH_TIME_WINDOW = 60  # Fenêtre de temps en secondes
FTP_BRUTE_FORCE_THRESHOLD = 10  # Nombre de tentatives avant alerte
FTP_ATTEMPT_RESET_TIME = 60  # Réinitialisation après 60 secondes
HTTP_BRUTE_FORCE_THRESHOLD = 30
HTTP_TIME_WINDOW = 60

# Structures globales
detection_counters = defaultdict(lambda: {"ports": set(), "packets": 0, "icmp": 0})
last_reset = time.time()

# Objet pour stocker les messages à envoyer
messages_to_send = []
messages_lock = threading.Lock()

def is_internal_ip(ip):
    try:
        ip_obj = ip_address(ip)
        return any(ip_obj in ip_network(net) for net in INTERNAL_IPS)
    except ValueError:
        return False

def get_local_ip():
    try:
        hostname = socket.gethostname()
        return socket.gethostbyname(hostname)
    except Exception as e:
        send_alert(f"Erreur IP locale: {e}", "ERROR")
        return None

def get_hostname(ip):
    try:
        return socket.gethostbyaddr(ip)[0]
    except socket.herror:
        return "Nom inconnu"

def send_alert(message, level="ERROR"):
    """Envoie une alerte via WebSocket au lieu de l'enregistrer dans un fichier"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    alert_data = {
        "timestamp": timestamp,
        "level": level,
        "message": message,
        "type": "alert"
    }
    
    with messages_lock:
        messages_to_send.append(alert_data)
    
    # Continuons de logger pour le débogage
    if level == "ERROR":
        logger.error(message)
    elif level == "WARNING":
        logger.warning(message)
    else:
        logger.info(message)

def send_detection(detection_type, source_ip, details=None):
    """Envoie une détection via WebSocket"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    detection_data = {
        "timestamp": timestamp,
        "type": "detection",
        "detection_type": detection_type,
        "source_ip": source_ip
    }
    
    if details:
        detection_data.update(details)
    
    with messages_lock:
        messages_to_send.append(detection_data)

def send_log(log_message, level="INFO"):
    """Envoie un log via WebSocket"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_data = {
        "timestamp": timestamp,
        "level": level,
        "message": log_message,
        "type": "log"
    }
    
    with messages_lock:
        messages_to_send.append(log_data)
    
    # Continuons de logger pour le débogage
    if level == "ERROR":
        logger.error(log_message)
    elif level == "WARNING":
        logger.warning(log_message)
    else:
        logger.info(log_message)

def reset_counters():
    global last_reset
    if time.time() - last_reset > 10:
        detection_counters.clear()
        last_reset = time.time()
        send_log("Réinitialisation des compteurs.", "INFO")

def detect_ip_spoofing(packet):
    src_ip = packet[IP].src
    if is_internal_ip(src_ip) and packet[IP].ttl < 5:
        send_alert(f"IP Spoofing détecté: {src_ip} (TTL: {packet[IP].ttl})", "ERROR")
        send_detection("ip_spoofing", src_ip, {"ttl": packet[IP].ttl})

def detect_port_scan(packet):
    if packet.haslayer(TCP):
        src_ip = packet[IP].src
        dst_port = packet[TCP].dport
        detection_counters[src_ip]["ports"].add(dst_port)
        if len(detection_counters[src_ip]["ports"]) > PORT_SCAN_THRESHOLD:
            send_alert(f"Scan de ports détecté: {src_ip} -> Port {dst_port}", "ERROR")
            send_detection("port_scan", src_ip, {"port": dst_port, "count": len(detection_counters[src_ip]["ports"])})

def detect_flood(packet):
    src_ip = packet[IP].src
    detection_counters[src_ip]["packets"] += 1
    if detection_counters[src_ip]["packets"] > FLOOD_THRESHOLD:
        send_alert(f"DDoS détecté: {src_ip}", "ERROR")
        send_detection("ddos", src_ip, {"packet_count": detection_counters[src_ip]["packets"]})

def detect_icmp_flood(packet):
    if packet.haslayer(ICMP):
        src_ip = packet[IP].src
        detection_counters[src_ip]["icmp"] += 1
        if detection_counters[src_ip]["icmp"] > PING_FLOOD_THRESHOLD:
            send_alert(f"Ping Flood détecté: {src_ip}", "WARNING")
            send_detection("ping_flood", src_ip, {"icmp_count": detection_counters[src_ip]["icmp"]})

def check_vulnerabilities(packet):
    if packet.haslayer(TCP) and packet[TCP].dport == 21:
        src_ip = packet[IP].src
        send_alert(f"Vulnérabilité FTP détectée: {src_ip}", "WARNING")
        send_detection("vulnerability", src_ip, {"service": "ftp"})

def detect_brute_force_ssh(packet):
    """Détecte les tentatives de brute force sur SSH."""
    if packet.haslayer(TCP) and packet[TCP].dport == 22:
        src_ip = packet[IP].src
        current_time = time.time()
        ssh_attempts[src_ip].append(current_time)

        # Nettoyer les anciennes tentatives
        ssh_attempts[src_ip] = [t for t in ssh_attempts[src_ip] if current_time - t <= SSH_TIME_WINDOW]

        # Vérifier si le seuil est dépassé
        if len(ssh_attempts[src_ip]) > SSH_BRUTE_FORCE_THRESHOLD:
            send_alert(f"Tentative de brute force SSH détectée ! IP suspecte: {src_ip}", "WARNING")
            send_detection("brute_force", src_ip, {"service": "ssh", "attempts": len(ssh_attempts[src_ip])})
            del ssh_attempts[src_ip]  # Réinitialiser les tentatives pour éviter les alertes continues

def detect_ftp_brute_force(packet):
    """Détecte les tentatives de brute force sur le serveur FTP."""
    if packet.haslayer(TCP) and packet[TCP].dport == 21:
        src_ip = packet[IP].src
        current_time = time.time()
        ftp_attempts[src_ip].append(current_time)

        # Filtrer les tentatives anciennes
        ftp_attempts[src_ip] = [t for t in ftp_attempts[src_ip] if current_time - t <= FTP_ATTEMPT_RESET_TIME]

        if len(ftp_attempts[src_ip]) > FTP_BRUTE_FORCE_THRESHOLD:
            send_alert(f"Tentative de brute force FTP détectée ! IP: {src_ip}", "WARNING")
            send_detection("brute_force", src_ip, {"service": "ftp", "attempts": len(ftp_attempts[src_ip])})
            del ftp_attempts[src_ip]  # Réinitialiser les tentatives après alerte

def detect_brute_force_http(packet):
    """Détecte les tentatives de brute force sur HTTP/HTTPS."""
    if packet.haslayer(TCP) and packet[TCP].dport in [80, 443]:
        src_ip = packet[IP].src
        current_time = time.time()
        http_attempts[src_ip].append(current_time)
        # Nettoyer les anciennes tentatives
        http_attempts[src_ip] = [t for t in http_attempts[src_ip] if current_time - t <= HTTP_TIME_WINDOW]
        # Vérifier si le seuil est dépassé
        if len(http_attempts[src_ip]) > HTTP_BRUTE_FORCE_THRESHOLD:
            send_alert(f"Tentative de brute force HTTP/HTTPS détectée ! IP suspecte: {src_ip}", "WARNING")
            send_detection("brute_force", src_ip, {"service": "http", "attempts": len(http_attempts[src_ip])})
            del http_attempts[src_ip]  # Réinitialiser les tentatives pour éviter les alertes continues

def get_netbios_name(src_ip):
    """Interroge le NetBIOS à partir de l'IP source."""
    try:
        netbios_request = IP(dst=src_ip)/UDP(sport=137, dport=137)/NBNSQueryRequest(QNAME="\x20"*32)
        response = sr1(netbios_request, timeout=2, verbose=False)
        if response and response.haslayer(NBNSQueryResponse):
            netbios_name = response[NBNSQueryResponse].QUERY_NAME.decode('utf-8').strip()
            return netbios_name
        else:
            return "Inconnu"
    except Exception as e:
        return "Inconnu"

def log_netbios_name(src_ip):
    """Log le nom NetBIOS de l'IP source."""
    netbios_name = get_netbios_name(src_ip)
    if netbios_name != "Inconnu":
        send_log(f"IP: {src_ip} - NetBIOS Name: {netbios_name}", "INFO")

def ignore_packet(packet):
    return packet[IP].src == LOCAL_IP or packet[IP].dst == LOCAL_IP

async def websocket_sender():
    """Fonction asynchrone pour envoyer les messages via WebSocket"""
    while True:
        try:
            async with websockets.connect(WEBSOCKET_SERVER) as websocket:
                logger.info("Connexion WebSocket établie")
                send_log("Connexion WebSocket établie", "INFO")
                
                while True:
                    # Vérifier si nous avons des messages à envoyer
                    with messages_lock:
                        if messages_to_send:
                            messages_batch = messages_to_send.copy()
                            messages_to_send.clear()
                        else:
                            messages_batch = []
                    
                    # Envoyer les messages en batch
                    if messages_batch:
                        await websocket.send(json.dumps(messages_batch))
                    
                    # Attendre un peu avant de vérifier à nouveau
                    await asyncio.sleep(0.1)
        
        except websockets.exceptions.ConnectionClosed:
            logger.warning("Connexion WebSocket fermée. Tentative de reconnexion...")
            await asyncio.sleep(5)
        except Exception as e:
            logger.error(f"Erreur WebSocket: {e}")
            await asyncio.sleep(5)

def packet_callback(packet):
    if not packet.haslayer(IP):
        return
    if ignore_packet(packet):
        return
    
    src_ip = packet[IP].src
    log_netbios_name(src_ip)
    
    reset_counters()
    detect_port_scan(packet)
    detect_flood(packet)
    detect_icmp_flood(packet)
    detect_ip_spoofing(packet)
    check_vulnerabilities(packet)
    detect_brute_force_ssh(packet)
    detect_ftp_brute_force(packet)
    detect_brute_force_http(packet)

async def main():
    # Démarrer le thread WebSocket
    websocket_task = asyncio.create_task(websocket_sender())
    
    # Démarrer la surveillance réseau dans un thread séparé
    def start_sniffing():
        logger.info("Démarrage de la surveillance réseau...")
        send_log("Démarrage de la surveillance réseau...", "INFO")
        sniff(prn=packet_callback, store=False)
    
    sniff_thread = threading.Thread(target=start_sniffing)
    sniff_thread.daemon = True
    sniff_thread.start()
    
    # Garder le programme en cours d'exécution
    try:
        await websocket_task
    except asyncio.CancelledError:
        pass

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Programme arrêté par l'utilisateur")
    except Exception as e:
        logger.error(f"Erreur critique: {e}")