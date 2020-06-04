const db = require('../data/dbConfig.js');
const voice = require('./voiceSamplesModel.js');

// find by id
const findById = async id => {
  const user = await db('users')
    .where({id})
    .first();
  user.samples = await voice.find(id);
  return user;
}

const findBySampleFilter = async (filter) => {
  
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

  let checker = (arr, target) => target.every(v => arr.includes(v));

  samples = samples.filter(sample => {
    return checker(sample.tags, filter);
  })

  return Promise.all(samples.map(async sample => {
    return await findById(sample.owner);
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
  findById,
  findByEmail,
  findBySampleFilter,
  addUser,
  updateUser,
  deactivateUser,
  reactivateUser,
  findInactiveUsers
}