const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate.js');

const Jobs = require('../models/jobsModel.js');
const Apply = require('../models/applicationsModel.js');

// Find all jobs
router.get('/', (req, res) => {
  console.log(req.query);
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

// Find jobs created by user
router.get('/myjobs/created', authenticate, (req, res) => {
  const id = req.dJwt.user_id;
  Jobs.findJobsByCreator(id)
    .then(jobs => {
      res.status(200).json(jobs)
    })
    .catch(err => {
      res.status(200).json({
        message: "You have not posted any jobs"
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

// Retrieve all applications to a job
router.post('/:id/applicants', (req, res) => {
  const [id] = req.params.id;
  if(id) {
    Apply.findJobApps(id)
      .then(list => {
        res.status(200).json(list);
      })
      .catch(err => {
        res.status(500).json({
          message: "Nobody has applied to this job",
          error: err.message
        })
      })
  } else {
    res.status(400).json({
      message: "You must supply a job id"
    })
  }
})


// Create job
router.post('/', authenticate, (req, res) => {
  const creator = req.dJwt;
  const job = req.body;

  console.log(creator);

  Jobs.createJob(creator.user_id, job)
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