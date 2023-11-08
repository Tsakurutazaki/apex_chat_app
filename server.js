const createServer = require('http').createServer;
const Server = require('socket.io').Server;

// import { createServer } from 'http'
// import { server } from 'socket.io' 

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)

  socket.on('message', data => {
    console.log(data)
    io.emit('message', `${socket.id.substring(0,5)} : ${data}`)
  })
});

httpServer.listen(8080, () => console.log('it is listening on port 8080'))




// const io = require('socket.io')(3000) // create server

// const users = {}


// io.on('connection', socket => {

//   socket.on('new-user', name => {
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   })

//   //socket.emit('chat-message', 'hello world')
//   socket.on('send-chat', data => {

//     socket.broadcast.emit('message-received', {data: data, user: users[socket.id]})
//   })

//   socket.on('disconnect', ()=> {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
// })