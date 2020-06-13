const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');
const uploadS3 = require('../common/uploadS3.js');

const voiceSample = require('../models/voiceSamplesModel.js');

router.get('/sample', (req, res) => {
  voiceSample.findAll()
    .then(samples => {
      res.status(200).json(samples)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// Get voice sample by id
router.get('/sample/:id', (req, res) => {
  let [id] = req.params.id
  id = Number(id)
  voiceSample.findById(id)
    .then(sample => {
      res.status(200).json(sample)
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find voice sample with ID: ${id}`,
        error: err
      })
    })
})

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
router.post('/', authenticate, uploadS3.single('file'), (req, res) => {

  const token = req.dJwt;
  const {title, description} = req.body;

  const sample = {
    owner: token.user_id,
    title: title,
    description: description,
    s3_location: req.file.location
  }

  console.log(sample);

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
  // Retrieve params to locate voice sample
  const id = Number(req.params.id);
  // Locate voice sample
  voiceSample.findById(id)
    .then(sample => {
      // Upon successul location of the voice sample:
      // Pass in the id of the sample and the list of tags associated with it
      voiceSample.removeSample(sample.id, sample.tags)
        .then(deleted => {
          // Respond deletion success
          res.status(200).json({
            message: deleted.message,
            associations_deleted: deleted.tags
          })
        })
        .catch(err => {
          // Respond deletion error
          res.status(500).json({
            message: `Could not delete voice sample with ID: ${id}`,
            error: err
          })
        })
    })
    .catch(err => {
      // Respond location error
      res.status(500).json({
        message: `Could not find voice sample with ID: ${id}`,
        error: err
      })
    })
})

module.exports = router;