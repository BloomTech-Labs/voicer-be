const express = require('express');
const router = express.Router();

const AVS = require('../models/attrVoiceSampleModel.js');

// add association
router.post('/', (req, res) => {
  const data = req.body;
  AVS.add(data)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not create association",
        error: err.message
      });
    });
})

// remove association
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  AVS.findById(id)
    .then(
      AVS.remove(id)
        .then(deleted => {
          res.status(200).json(deleted);
        })
        .catch(err => {
          res.status(500).json({
            message: "Could not delete association",
            error: err.message
          });
        })
    )
    .catch(err => {
      res.status(400).json({
        message: `Could not find assocation with ID: ${id}`,
        error: err.message
      });
    });
})

module.exports = router;