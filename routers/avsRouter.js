const express = require('express');
const router = express.Router();

const AVS = require('../models/attrVoiceSampleModel.js');

// remove association
router.delete('/', (req, res) => {
  console.log(req.body);
  const { id, title } = req.body;
  AVS.remove(id, title)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not remove relation',
        error: err
      })
    })
})

module.exports = router;