const express = require('express');
const helmet = require('helmet');
const AWS = require('aws-sdk');
const cors = require('cors');
const checkToken = require('../middleware/checkToken.js');
const authenticate = require('../middleware/authenticate.js');

const authRouter = require('../routers/auth-router.js');
const userRouter = require('../routers/userRouter.js');
const voiceSampleRouter = require('../routers/voiceSampleRouter.js');
const avsRouter = require('../routers/avsRouter.js');
const attributesRouter = require('../routers/attributeRouter.js');
const jobsRouter = require('../routers/jobsRouter.js');
const applicationsRouter = require('../routers/applicationsRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(checkToken);

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/voice', voiceSampleRouter);
server.use('/api/avs', avsRouter);
server.use('/api/attribute', attributesRouter);
server.use('/api/jobs', jobsRouter);
server.use('/api/jobs/apply', authenticate, applicationsRouter);

AWS.config.update({
  region: process.env.AWSRegion,
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;