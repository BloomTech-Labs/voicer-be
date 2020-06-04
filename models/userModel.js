const db = require('../data/dbConfig.js');
const voice = require('./voiceSamplesModel.js');

// retrieve all users
const findAll = async () => {
  const users = await db('users')
    .select(
      'id', 'email',
      'first_name', 'last_name',
      'display_name', 'payrate',
      'location', 'jobsCompleted',
      'bio', 'average_rating',
      'account_balance', 'active'
    )
  return Promise.all(users.map(async user => {
    user.samples = await voice.find(user.id)
    return user;
  }))
}

// find by id
const findById = async id => {
  const user = await db('users')
    .where({id})
    .first()
    .select(
      'id', 'email',
      'first_name', 'last_name',
      'display_name', 'payrate',
      'location', 'jobsCompleted',
      'bio', 'average_rating',
      'account_balance', 'active'
    );
  user.samples = await voice.find(id);
  return user;
}

const findBySampleFilter = async (filter) => {
  
  // Retrieve samples with attributes
  let samples = await db('voice_samples as vs')
    .join(
      'attributes_voice_samples as avs',
      'avs.voice_sample_id', '=', 'vs.id'
    )
    .join(
      'attributes as attr',
      'attr.id', '=', 'avs.attribute_id'
    )
    .select([
      'vs.id',
      'vs.owner',
      db.raw('ARRAY_AGG(attr.title) as tags')
    ])
    .groupBy('vs.id')

  // Check samples against filter
  let checker = (arr, target) => target.every(v => arr.includes(v));

  // Filter out samples that don't match
  samples = samples.filter(sample => {
    return checker(sample.tags, filter);
  })

  // Store list of user id's
  let userIds = samples.map(sample => {
    return sample.owner;
  })

  // Remove duplicate values
  userIds = [...new Set(userIds)];

  // Return list of users that match the filtered samples
  return Promise.all(userIds.map(async userId => {
    return await findById(userId);
  }))
}

const findByEmail = async email => {
  const user = await db('users')
    .where(email)
    .first();
  user.samples = await voice.find(id);
  return user;
}

// Returns an array of all deactivated users
const findInactiveUsers = () => {
  return db('users')
    .where({active: false})
}

// Adds the user to the database and returns the new User
const addUser = async (user) => {
  const [id] = await db('users')
    .insert(user)
    .returning('id');
  return findById(id);
}

// Updates the user with the given userId
const updateUser = async (id, user) => {
  return await db('users')
    .where({id})
    .first()
    .update(user)
    .returning('id');
}

// Archives the user with the given userId
const deactivateUser = async id => {
  let user = await db('users')
  	.where({id})
  	.first();
  console.log(user)
  user = await toggleActive(user);
  return user;
}

// Reactivates user
const reactivateUser = async id => {
  let user = await db('users')
    .where({id})
    .first();
	console.log(user)
  user = await toggleActive(user);
  return user;
}

// helper function for dry archival toggling
const toggleActive = async user => {
  console.log(user)
  user.active = !user.active;
  console.log(user)
  user = await updateUser(user);
  return user;
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  findBySampleFilter,
  addUser,
  updateUser,
  deactivateUser,
  reactivateUser,
  findInactiveUsers
}