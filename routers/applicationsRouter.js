const express = require('express');
const router = express.Router();

const Apply = require('../models/applicationsModel.js');

// Find jobs user has applied to
router.get('/', (req, res) => {
  Apply.findMyApps()
    .then(apps => {
      res.status(200).json(apps);
    })
    .catch(err => {
      res.status(500).json({
        message: `${req.dJwt.display_name} has not applied for any jobs`,
        error: err.message
      })
    })
})

// Find jobs user was hired onto
router.get('/hired', (req, res) => {
  Apply.findMyHired()
    .then(hired => {
      res.status(200).json(hired);
    })
    .catch(err => {
      res.status(500).json({
        message: `${req.dJwt.display_name} has not been hired to any jobs`,
        error: err.message
      })
    })
})

// Apply to a job
router.post('/:id', (req, res) => {
  const [id] = req.params.id;
  if(id) {
    Apply.applyToJob(id)
      .then(applied => {
        res.status(200).json(applied);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error applying to the job",
          error: err.message
        })
      })
  } else {
    res.status(400).json({
      message: "You must supply a job id"
    })
  }
  
})

// Rescind Application
router.delete('/:id', (req, res) => {
  const [id] = req.params.id;
  if(id) {
    Apply.rescindApp(id)
      .then(rescinded => {
        res.status(200).json({
          message: "Successfully rescinded application"
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error",
          error: err.message
        })
      })
  } else {
    res.status(400).json({
      message: "You must supply a job id"
    })
  }
})

// Accept Application
router.post('/hire-talent', (req, res) => {
  if(req.query) {
    Apply.hireUser(req.query)
      .then(hired => {
        res.status(200).json(hired);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error hiring the user",
          error: err.message
        })
      })
  } else {
    res.status(400).json({
      message: "You must supply the id of the application"
    })
  }
})

// Reject Application
router.get('/reject-talent', (req, res) => {
  if(req.query) {
    Apply.rejectUser(req.query)
      .then(rejected => {
        res.status(200).json(rejected);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error rejecting the application",
          error: err.message
        })
      })
  } else {
    res.status(400).json({
      message: "You must supply the id of the application"
    })
  }
})

module.exports = router;