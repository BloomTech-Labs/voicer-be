const db = require('../data/dbConfig.js');
const Jobs = require('./jobsModel.js');

// Find application by id
const findAppById = id => {
  return db('contracted_jobs')
    .where({id})
    .first();
}

// Returns a list of all jobs the user has applied to
const findMyApps = () => {
  return db('contracted_jobs')
    .where({display_name: req.dJwt.display_name});
}

// Returns a list of all applications to specified job
const findJobApps = id => {
  return db('contracted_jobs')
    .where({job_id: id});
}

// Apply to selected job
const applyToJob = async (jobID) => {
  const application = {
    display_name: req.dJwt.display_name,
    job_id: jobID
  }
  const [id] = await db('contracted_jobs')
    .insert(application)
    .returning('id');
  return findAppById(id);
}

// Rescind application
const rescindApp = (jobID) => {
  return await db('contracted_jobs')
    .where({job_id: jobID})
    .del()
}

// Hire applicant
const hireUser = async (id) => {
  return await setAppStatus(id, "accepted");
}

// Reject applicant
const rejectUser = async (id) => {
  return await setAppStatus(id, "rejected");
}

const setAppStatus = async (id, status) => {
  const cont_job = await findAppById(id);
  cont_job.application_status = status;
  const [id] = await db('contracted_jobs')
    .where({id})
    .update(cont_job)
    .returning('id')
  return findAppById(id);
}

// Find jobs where specified user is/was hired
const findMyHired = () => {
  const idArray =  db('contracted_jobs')
    .where({
      display_name: req.dJwt.display_name,
      application_status: "hired"
    })
    .select('job_id');
  return Promise.all(idArray.map(id => {
    return Jobs.findById(id);
  }))
}

module.exports = {
  findAppById,
  findJobApps,
  findMyApps,
  applyToJob,
  rescindApp,
  hireUser,
  rejectUser,
  findMyHired
}