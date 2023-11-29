const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer((req, res) => {
  if (req.url == "/") {
     res.end('<h1>Hello World</h1>')
  }
  if (req.url == '/about') {
  res.end('<h1>Page About Us</h1>')
  }
  if (req.url == '/contact') {
  res.end('<h1>Page Contact</h1>')
  }
  })
  
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

let connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
  console.log('new user');

  socket.on('user_connected', (username) => {
    connectedUsers[socket.id] = username; 

    io.emit('user_list', connectedUsers);
  });


  socket.on('chatMessage', (data) => {
    const socketId = data.socketID;
    const message = data.message;
    const username = connectedUsers[socket.id];
    console.log(socketId, '\n', message);
    io.to(socketId).emit('cmessage',({username,message}));

    // io.emit('message', {username : message});
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected')
    delete connectedUsers[socket.id];

    io.emit('user_list', Object.values(connectedUsers))
  })


  // socket.on('message', data => {
  //   console.log(data);
  //   io.emit('message', `${socket.id.substring(0, 5)} : ${data}`);
  // });

  
});

httpServer.listen(8080, () => console.log('It is listening on port 8080'));
