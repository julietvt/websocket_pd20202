const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const connectionHandler = require('./ws');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const router = require('./router');
const { connect } = require('./router');
app.use(router);
io.on('connection', connectionHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
