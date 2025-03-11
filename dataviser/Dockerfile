# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["npm", "run","dev"]
EXPOSE 3000