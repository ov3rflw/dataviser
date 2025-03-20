import logging

# Configuration du logger
logger = logging.getLogger("NetworkLogger")
logger.setLevel(logging.DEBUG)

# Création de formats pour les messages
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s', datefmt="%Y-%m-%d %H:%M:%S")

# Création des handlers pour la console
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# Handler pour les alertes et erreurs (niveau WARNING et supérieur)
file_handler_alerts = logging.FileHandler('alerts.json')
file_handler_alerts.setFormatter(formatter)
file_handler_alerts.setLevel(logging.WARNING)  # Inclut WARNING, ERROR et CRITICAL
logger.addHandler(file_handler_alerts)

# Handler pour les informations (niveau DEBUG et INFO, excluant WARNING et ERROR)
file_handler_network = logging.FileHandler('info.json')
file_handler_network.setFormatter(formatter)
file_handler_network.setLevel(logging.DEBUG)  # Inclut DEBUG, INFO mais pas WARNING, ERROR
# Exclure explicitement les logs WARNING et ERROR en ajoutant un filtre
file_handler_network.addFilter(lambda record: record.levelno != logging.WARNING and record.levelno != logging.ERROR)  # Exclut WARNING et ERROR
logger.addHandler(file_handler_network)

# Handler pour tous les logs (niveau DEBUG et plus élevé)
file_handler_general = logging.FileHandler('general_logs.json')
file_handler_general.setFormatter(formatter)
file_handler_general.setLevel(logging.DEBUG)  # Tous les logs (DEBUG et plus élevés)
logger.addHandler(file_handler_general)

logging.basicConfig(level=logging.INFO)  # Ce niveau ne capture que INFO et les niveaux plus élevés (WARNING, ERROR)

# On évite la duplication des logs dans les handlers
logger.propagate = False
