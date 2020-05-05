const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');

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
router.post('/', /*authenticate(),*/ (req, res) => {
  const sample = req.body;
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
router.put('/:id', async (req, res) => {
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

module.exports = router;