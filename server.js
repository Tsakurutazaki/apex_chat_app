const { createServer } = require("http");
const { Server } = require("socket.io");


const httpServer = createServer((req, res) => {
  if (req.url == "/") {
    res.end("Running...")
  }
})
const io = new Server(httpServer, { cors: '*' });

io.on('connection', (socket) => {
  console.log(socket.id)

})
httpServer.listen(8080, () => {
  console.log('Server listining on port 8080')
});