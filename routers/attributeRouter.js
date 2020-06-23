const express = require('express');
const router = express.Router();

const checkRole = require('../middleware/checkRole.js');
const Attributes = require('../models/attributesModel.js');

// find all attributes with or without filter
router.get('/', (req, res) => {
  const filter = req.query;
  Attributes.find(filter)
    .then(attr => {
      res.status(200).json(attr)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not find attributes",
        error: err.message
      })
    })
})

// add an attribute
router.post('/', (req, res) => {
  const data = req.body;
  Attributes.addAttributeToSample(data)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add attribute",
        error: err.message
      })
    })
})

// edit an attribute
router.put('/:id', /*checkRole,*/ (req, res) => {
  const id = req.params.id;
  const attribute = req.body;
  Attributes.findById(id)
    .then(
      Attributes.edit(id, attribute)
        .then(updated => {
          res.status(200).json(updated)
        })
        .catch(err => {
          res.status(400).json({
            message: "Could not update attribute",
            error: err.message
          })
        })
    )
    .catch(err => {
      res.status(500).json({
        message: `Could not find attribute with ID: ${id}`,
        error: err.message
      })
    })
})

// delete an attribute
router.delete('/:id', /*checkRole,*/ (req, res) => {
  const id = req.params.id;
  Attributes.findById(id)
    .then(
      Attributes.remove(id)
        .then(deleted => {
          res.status(200).json(deleted)
        })
        .catch(err => {
          res.status(500).json({
            message: `Could not delete attribute with ID: ${id}`,
            error: err.message
          })
        })
    )
    .catch(err => {
      res.status(400).json({
        message: `Could not find attribute with ID: ${id}`,
        error: err.message
      })
    })
})

module.exports = router;