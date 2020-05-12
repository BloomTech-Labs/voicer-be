const express = require('express');
const helmet = require('helmet');
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

const AWS = require('aws-sdk');

AWS.config.getCredentials(err => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("Access key: ", AWS.config.credentials.accessKeyId);
    console.log("Secret access key: ", AWS.config.credentials.secretAccessKey);
  }
})

console.log("Region: ", AWS.config.region);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;