FROM node:lts-alpine
WORKDIR /app 
COPY package.json ./
RUN npm install 

COPY . . 

RUN npx prisma generate

EXPOSE 3001
CMD ["node", "server.js"]