const createServer = require('http').createServer;
const Server = requir('socket.io').server;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});


io.on('connection', (socket) => {
  console.log(socket.id)
})