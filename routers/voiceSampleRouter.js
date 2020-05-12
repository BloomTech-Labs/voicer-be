const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');

const AWS = require('aws-sdk');
const s3_handler = require('../aws/s3_handler.js');
const multer = require('multer');
const multerS3 = require('multer-s3');

const voiceSample = require('../models/voiceSamplesModel.js');

// Get a list of voice samples for the specified user
router.get('/:id', (req, res) => {
  // ID is the id of the user
  const [id] = req.params.id;
  voiceSample.find(id)
    .then(samples => {
      res.status(200).json(samples);
    })
    .catch(err => {
      res.status(400).json({
        error: err.message
      });
    })
})

// Add a voice sample
router.post('/', authenticate, (req, res) => {
  const token = req.dJwt;
  const {title, description} = req.body;

  const s3_location = s3_handler();

  const sample = {
    owner: token.user_id,
    title: title,
    description: description,
    s3_location: s3_location
  }

  voiceSample.addSample(sample)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(400).json({
        error: err.message
      });
    })
})

// Update a voice sample
router.put('/:id', authenticate, (req, res) => {
  const sample = req.body;
  voiceSample.updateSample(sample)
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(err => {
      res.status(400).json({
        error: err.message
      });
    })
})

// Delete a voice sample
router.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  voiceSample.findById(id)
    .then(
      voiceSample.removeSample(id)
        .then(deleted => {
          res.status(200).json(deleted)
        })
        .catch(err => {
          res.status(500).json({
            message: `Could not delete voice sample with ID: ${id}`,
            error: err.message
          })
        })
    )
    .catch(err => {
      res.status(400).json({
        message: `Could not find voice sample with ID: ${id}`,
        error: err.message
      })
    })
})

module.exports = router;