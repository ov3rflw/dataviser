import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {

  // Quand on reçoit un message
  socket.on('message', (message) => {
    console.log('Message reçu:', message);
    io.emit('message', message);
  });

  socket.on('user_created', (newUser) => {
    console.log('user_created', newUser);
    io.emit('new_user_avaible', newUser);
  });
});

server.listen(3001, () => {
  console.log('Serveur WebSocket démarré sur port 3001');
});
