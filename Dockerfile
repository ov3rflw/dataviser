# Utilisation de Node.js basé sur Alpine Linux (léger)
FROM node:20-alpine 

# Définition du répertoire de travail
WORKDIR /app 

# Copie uniquement package.json et package-lock.json pour optimiser le cache
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install 

# Copie du code source
COPY . . 

# Exposition du port de développement de Next.js
EXPOSE 3000 

# Démarrage en mode développement
CMD ["npm", "run", "dev"]
