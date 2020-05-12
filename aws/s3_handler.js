const AWS = require('aws-sdk');
const uui = require('uuid');

AWS.config.update({
  region: process.env.AWSRegion,
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_bucket = process.env.S3_bucket;

AWS.config.getCredentials(err => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("Access key: ", AWS.config.credentials.accessKeyId);
    console.log("Secret access key: ", AWS.config.credentials.secretAccessKey);
  }
})

console.log("Region: ", AWS.config.region);