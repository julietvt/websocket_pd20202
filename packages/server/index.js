const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const router = require('./router');
app.use(router);

io.on('connection', function (socket) {
  socket.on('test', (data, options) => {
    console.log('data:', data);
    console.log('options:', options);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
