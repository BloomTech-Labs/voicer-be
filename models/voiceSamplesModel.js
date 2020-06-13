const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');
const attributes = require('./attributesModel.js');

// Find all voice samples where id = user.id
const find = async (id) => {
  let samples = await db('voice_samples as vs')
    .where({owner: id})
    .select([
      'vs.id',
      'vs.title',
      'vs.description',
      'vs.rating',
      'vs.s3_location'
    ])

  samples = Promise.all(samples.map(async sample => {
    sample.tags = await attributes.find(sample.id)
    return sample
  }))

  return samples;
}

const findAll = () => {
  return db('voice_samples')
    .join(
      'users',
      'voice_samples.owner', '=', 'users.id'
    )
    .select(
      'users.id as user_id',
      'users.display_name as user',
      'voice_samples.id as sample_id',
      'voice_samples.title as sample_title'
    )
}

const findById = async id => {
  let sample = await db('voice_samples')
    .where({id})
    .first()
  sample.tags = await attributes.find(id)
  return sample;
}

const findAfterCreate = id => {
  return db('voice_samples')
    .where({id})
    .first()
}

const addSample = async (data) => {
  const [id] = await db('voice_samples')
    .insert(data)
    .returning('id');
  console.log("Add Sample: ", id);
  return findAfterCreate(id);
}

const updateSample = async (data) => {
  const [id] = await db('voice_samples')
    .where({id: data.id})
    .update(data)
    .returning('id');
  return findById(id);
}

// Function to remove a voice sample and all associations
const removeSample = async (id, tags) => {
  // Go through list of tags and delete associations in
  //   the intermediary table
  let deleted_tags = await Promise.all(tags.map(async tag => {
    await avs.remove(id, tag)
    return tag
  }))
  // Delete sample
  await db('voice_samples')
    .where({id})
    .first()
    .del()
  deleted_message = {
    message: `Deleted voice sample with ID: ${id}`,
    tags: deleted_tags
  }
  return deleted_message
}

module.exports = {
  find,
  findById,
  findAll,
  findAfterCreate,
  addSample,
  updateSample,
  removeSample
}