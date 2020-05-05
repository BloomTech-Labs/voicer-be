const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const checkToken = require('../middleware/checkToken.js');

const authRouter = require('../routers/auth-router.js');
const userRouter = require('../routers/userRouter.js');
const voiceSampleRouter = require('../routers/voiceSampleRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(checkToken);

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/samples', voiceSampleRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;