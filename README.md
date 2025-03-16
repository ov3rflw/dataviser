## Pré-requis

- docker-compose
- docker
- docker-desktop
- npm

## Installation des pré-requis :

[Docker Desktop: The #1 Containerization Tool for Developers | Docker](https://www.docker.com/products/docker-desktop/)

[Downloading and installing Node.js and npm | npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Télécharger le projet Dataviser

Tapez la commande suivante :

```bash
git clone https://github.com/ov3rflw/dataviser.git
cd dataviser
```

À l’intérieur de ce dossier, vous trouverez deux autres dossiers et un fichier de configuration.

| Dossier/Fichier | Description |
| --- | --- |
| `application_web` | Application web |
| `websocket_server` | Serveur WebSocket |
| `docker-compose.yml` | Fichier de configuration pour Docker Compose |

## Build et dockerization de Dataviser

Pour pouvoir utiliser Dataviser, il faudra builder le projet et effectuer une petite manipulation sur le conteneur **app-1**.

### Docker Compose

À la racine du projet, tapez la commande suivante : 

```bash
docker-compose up --build -d 
```

Cette commande va builder les images des conteneurs avant de les démarrer en arrière-plan sans bloquer le terminal.

### Configuration de `app-1`

Ensuite, il faudra se connecter au conteneur **app-1** pour effectuer un push du schéma **Prisma** vers le serveur **MySQL**.

```bash
# Se connecter à app-1
docker exec -it app-1 sh
npx prisma migrate dev --name init
```

## ⚠️ Problèmes connus ⚠️

### Erreur de base de données

S’il est impossible de se connecter à la plateforme Dataviser, il se peut que les droits de l’utilisateur `dev` dans la base de données ne soient pas les bons. Pour cela, exécutez les commandes suivantes :

```bash
docker exec -it db-1 sh
mysql -u root -p [pass root]

GRANT ALL PRIVILEGES ON dataviser.* TO "dev"@"%";
FLUSH PRIVILEGES;
exit;
```

### Erreur lors de la phase de build

Si vous obtenez une erreur comme :

```bash
docker: Error response from daemon: driver failed programming external connectivity on endpoint <container_name> (hash):
Bind for 0.0.0.0:3306 failed: port is already allocated.
```

Il est possible qu’un service tourne sur le port `3306` et empêche la base de données du conteneur `db-1` de l’utiliser.

Il faudra donc vérifier si MySQL ne tourne pas déjà en arrière-plan. Si c’est le cas, arrêtez le processus et relancez le build.

---

## 🚧 Statut du projet

Dataviser n'est pas encore un projet opérationnel. Il est actuellement en cours de développement, et nous prévoyons de le sortir avant la fin de juin.
