# TODO : ajouter d'autres méthodes pour la détection de vulnérabilité sur le réseau

import socketio
from scapy.all import sniff
from collections import defaultdict
import json
import ipaddress

sio = socketio.Client()
WEBSOCKET_SERVER = "http://localhost:3001"
PACKET_THRESHOLD = 50

traffic_count = defaultdict(int)

@sio.event
def connect():
    print("Connecté au serveur WebSocket")

@sio.event
def disconnect():
    print("Déconnecté du serveur WebSocket")

def is_private_ip(ip):
    """ Vérifie si l'IP est locale ou réservée """
    try:
        return ipaddress.ip_address(ip).is_private
    except ValueError:
        return False

def detect_anomalies(packet):
    """ Analyse le trafic et détecte les anomalies """
    if packet.haslayer("IP"):
        src_ip = packet["IP"].src
        traffic_count[src_ip] += 1

        if traffic_count[src_ip] > PACKET_THRESHOLD:
            alert = {
                "type": "DDOS",
                "message": f"Possible attaque DDoS détectée depuis {src_ip}",
                "srcIp": src_ip
            }
            detection = {
                "srcIp": src_ip,
                "detectionType": "DDOS",
                "packetCount": traffic_count[src_ip],
                "threshold": PACKET_THRESHOLD
            }

            send_event("alert", alert)
            send_event("detection", detection)

            traffic_count[src_ip] = 0  

def send_event(event, data):
    """ Envoie une alerte ou une détection au serveur WebSocket """
    try:
        sio.emit(event, json.dumps(data))
        print(f"{event.capitalize()} envoyée : {data}")
    except Exception as e:
        print(f"Erreur WebSocket : {e}")

if __name__ == "__main__":
    try:
        sio.connect(WEBSOCKET_SERVER)
    except Exception as e:
        print(f"Impossible de se connecter au serveur WebSocket : {e}")

    sniff(filter="tcp and (port 22 or port 80 or port 443)", prn=detect_anomalies, store=False)
