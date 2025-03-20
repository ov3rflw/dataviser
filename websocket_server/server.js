import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`Nouvelle connexion: ${socket.id}`);

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('log', async (message) => {
    try {
      const data = JSON.parse(message);

      if (!data.level || !data.message) {
        return socket.emit('error', { message: 'Données de log invalides' });
      }

      const log = await prisma.log.create({
        data: {
          level: data.level,
          message: data.message,
          category: data.category || "General",
          ip: data.ip || null,
          timestamp: data.timestamp ? new Date(data.timestamp) : new Date()
        }
      });

      io.emit('log', log);
    } catch (e) {
      console.error('Erreur lors de la création du log:', e);
      socket.emit('error', { message: 'Erreur lors de la création du log', details: e.message });
    }
  });

  socket.on('alert', async (message) => {
    console.log("🚨 ALERT REÇUE:", message);
    try {
      const data = JSON.parse(message);

      if (!data.type || !data.message || !data.srcIp) {
        return socket.emit('error', { message: 'Données d\'alerte invalides' });
      }

      let ip = await prisma.iP.findUnique({
        where: { ip: data.srcIp }
      });

      if (!ip) {

        ip = await prisma.iP.create({
          data: { ip: data.srcIp }
        });
      }

      const alert = await prisma.alert.create({
        data: {
          srcIp: data.srcIp,
          alertType: data.type,
          description: data.message,
          timestamp: new Date()
        }
      });

      io.emit('alert', alert);
      console.log("Alerte enregistrée en DB:", alert);
    } catch (e) {
      console.error('Erreur lors de la création de l\'alerte:', e);
      socket.emit('error', { message: 'Erreur lors de la création de l\'alerte', details: e.message });
    }
  });

  socket.on('detection', async (message) => {
    console.log("🔍 DÉTECTION REÇUE:", message);
    try {
      const data = JSON.parse(message);

      if (!data.srcIp || !data.detectionType || !data.packetCount || !data.threshold) {
        return socket.emit('error', { message: 'Données de détection invalides' });
      }

      let ip = await prisma.iP.findUnique({
        where: { ip: data.srcIp }
      });

      if (!ip) {
        ip = await prisma.iP.create({
          data: { ip: data.srcIp }
        });
      }

      const detection = await prisma.detection.create({
        data: {
          srcIp: data.srcIp,
          detectionType: data.detectionType,
          packetCount: data.packetCount,
          threshold: data.threshold,
          timestamp: new Date()
        }
      });

      io.emit('detection', detection);
      console.log("Détection enregistrée en DB:", detection);
    } catch (e) {
      console.error('Erreur lors de la création de la détection:', e);
      socket.emit('error', { message: 'Erreur lors de la création de la détection', details: e.message });
    }
  });

  socket.on('user_created', (newUser) => {
    console.log('USER CREATED:', newUser);
    io.emit('new_user_available', newUser);
  });

  socket.on('disconnect', () => {
    console.log(`Client déconnecté: ${socket.id}`);
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(3001, () => {
  console.log('Serveur WebSocket démarré sur port 3001');
});
