# Dataviser

Dataviser est un projet en cours de développement permettant d'analyser et de visualiser des alertes réseau en temps réel. Il repose sur plusieurs composants, notamment une application web, un serveur WebSocket et des utilitaires Python dédiés à l'analyse du trafic réseau.

## 📌 Pré-requis

Avant d'installer et d'exécuter Dataviser, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js et npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## 🚀 Installation

### 1. Cloner le projet

Exécutez la commande suivante pour récupérer le projet depuis GitHub :

```bash
git clone https://github.com/ov3rflw/dataviser.git
cd dataviser
```

### 2. Structure du projet

À l’intérieur du dossier `dataviser`, vous trouverez les éléments suivants :

| Dossier/Fichier        | Description |
|------------------------|-------------|
| `application_web`      | Application web permettant la visualisation des alertes |
| `websocket_server`     | Serveur WebSocket qui gère les notifications en temps réel |
| `python_utils`        | Scripts Python pour l'analyse du trafic réseau et la détection d'intrusions |
| `docker-compose.yml`   | Fichier de configuration pour Docker Compose |

## 📦 Build et exécution de Dataviser

### 1. Lancer les conteneurs avec Docker Compose

À la racine du projet, exécutez la commande suivante :

```bash
docker-compose up --build -d
```

Cela va builder les images des conteneurs et les démarrer en arrière-plan sans bloquer le terminal.

### 2. Configuration du conteneur `app-1`

Une fois les conteneurs en cours d'exécution, vous devez exécuter une migration du schéma Prisma vers la base de données MySQL :

```bash
# Se connecter au conteneur `app-1`
docker exec -it app-1 sh

# Appliquer les migrations Prisma
npx prisma migrate dev --name init
```

## ⚠️ Problèmes connus et solutions

### Erreur de connexion à la base de données

Si l'application ne parvient pas à se connecter à la base de données, il se peut que les droits de l'utilisateur `dev` ne soient pas correctement configurés. Pour résoudre ce problème, exécutez les commandes suivantes :

```bash
docker exec -it db-1 sh
mysql -u root -p [mot_de_passe_root]

GRANT ALL PRIVILEGES ON dataviser.* TO "dev"@"%";
FLUSH PRIVILEGES;
exit;
```

### Erreur lors du build (port 3306 déjà utilisé)

Si vous obtenez une erreur indiquant que le port `3306` est déjà alloué, cela signifie qu'un autre service MySQL tourne en arrière-plan. Pour résoudre ce problème :

1. Vérifiez si un service MySQL est en cours d'exécution :
   ```bash
   sudo netstat -tulnp | grep 3306
   ```
2. Arrêtez le service si nécessaire :
   ```bash
   sudo systemctl stop mysql
   ```
3. Relancez le build :
   ```bash
   docker-compose up --build -d
   ```

---

## 🚧 État du projet

Dataviser est encore en cours de développement. Nous prévoyons une première version opérationnelle d'ici la fin du mois de juin.

N'hésitez pas à consulter notre dépôt GitHub et à nous faire part de vos suggestions !
