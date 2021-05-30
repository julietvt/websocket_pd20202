const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const router = require('./router');
app.use(router);

app.use(bodyParser);
app.use(express.json);

io.on('connection', function connectionHandlerFun(socket) {
  socket.broadcast.emit('new-user', socket.id);
  socket.on('send-message', (to, message) => {
    message.author = socket.id;
    socket.to(to).emit('private-message', message);
  });
  socket.on('get-users', () => {
    io.clients((error, clients) => {
      const users = [...clients];
      users.push(users.indexOf(socket.id), 1);
      socket.emit('get-users', users);
    });
  });
  io.on('disconnect', (reason) => {
    console.log(reason);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
