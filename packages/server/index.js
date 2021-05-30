const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const corsOpt = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const server = http.Server(app);
//const io = socketIO(server);
const io = socketIO(server, { corsOpt });

const router = require('./router');
const { connect } = require('./router');
const { default: socket } = require('../client/src/api/ws');
app.use(router);

const rooms = ['room1', 'room2'];
const joinToRooms = (socket) => {
  rooms.forEach((room) => {
    socket.join(room);
  });
};

io.on('connection', function connectionHandlerFun(socket) {
  joinToRooms(socket);
  socket.on('message', (room, message) => {
    io.on(room).emit('new-message', room, message);
  });
  socket.on('join-to-room', (room) => {});
});

io.on('disconnect', (reason) => {
  console.log(reason);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
