const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const connectionHandler = require('./ws');
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
app.use(router);

io.on('connection', connectionHandler);
io.on('disconnect', (reason) => {
  console.log(reason);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
