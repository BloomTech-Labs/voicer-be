const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');

const Jobs = require('../models/jobsModel.js');

// Find all jobs
router.get('/', (req, res) => {
  Jobs.filterFind(req.query)
    .then(found => {
      res.status(200).json({
        message: `Found ${found.length} jobs`,
        found
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not find any open jobs",
        error: err.message
      })
    })
})

// Find job by id
router.get('/:id', (req, res) => {
  const [id] = req.params.id;
  Jobs.findById(id)
    .then(job => {
      res.status(200).json(job);
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not find job with ID: ${id}`,
        error: err.message
      })
    })
})

// Create job
router.post('/', authenticate, (req, res) => {
  const creatorId = req.dJwt.id;
  const job = req.body;
  Jobs.createJob(creatorId, job)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(err => {
      res.status(500).json({
        message: `Sorry ${req.dJwt.first_name}, I can't let you do that`,
        error: err.message
      })
    })
})

// Update job
router.put('/:id', authenticate, (req, res) => {
  const [id] = req.params.id;
  const job = req.body;
  Jobs.findById(id)
    .then(
      Jobs.updateJob(id, job)
        .then(updated => {
          res.status(200).json(updated)
        })
        .catch(err => {
          res.status(500).json({
            message: `Could not update job with ID: ${id}`,
            error: err.message
          })
        })
    )
    .catch(err => {
      res.status(500).json({
        message: `Could not find job with ID: ${id}`,
        error: err.message
      })
    })
})

// Remove a job
router.delete('/:id', authenticate, (req, res) => {
  const [id] = req.params.id;
  Jobs.findById(id)
    .then(
      Jobs.removeJob(id)
        .then(deleted => {
          res.status(200).json(deleted)
        })
        .catch(err => {
          res.status(500).json({
            message: `Could not delete job with ID: ${id}`,
            error: err.message
          })
        })
    )
    .catch(err => {
      res.status(500).json({
        message: `Could not find job with ID: ${id}`,
        error: err.message
      })
    })
})

module.exports = router;