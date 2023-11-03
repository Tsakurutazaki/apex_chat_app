// const { createServer } = require("http");
// const { Server } = require("socket.io");


// const httpServer = createServer((req, res) => {
//   if (req.url == "/") {
//     res.end("Running...")
//   }
// })
// const io = new Server(httpServer, { cors: '*' });


const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer((req, res) => {
  res.end('Node.js server is running');
});

const io = socketIO(server);

const connectedClients = {};

// io.on('connection', (socket) => {
//   console.log(socket.id)

// })
// httpServer.listen(8080, () => {
//   console.log('Server listining on port 8080')
//   console.log("Server is still listening on")
// });  if required then use this 

io.on('connection', socket => {
  console.log("new user joined")
})





io.on('connection', (socket) => {
  console.log('Client connected');

  // When a client sends a message to another client
  socket.on('privateMessage', (data) => {
    const recipientSocket = connectedClients[data.recipientId];
    if (recipientSocket) {
      recipientSocket.emit('privateMessage', {
        senderId: socket.id,
        message: data.message,
      });
    }
  });


  // When a client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    delete connectedClients[socket.id];
    if (typingClients[socket.id]) {
      delete typingClients[socket.id];
      io.emit('typing', Object.keys(typingClients));
    }
  });

  // Store the connected client
  connectedClients[socket.id] = socket;
});

server.listen(8080, () => {
  console.log('Node.js server is listening on port 8080');
});