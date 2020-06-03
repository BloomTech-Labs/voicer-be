const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');
const attributes = require('./attributesModel.js');

// Find all voice samples where id = user.id
const find = async (id) => {
  // Retrieve all voice samples for user
  let samples = await db('voice_samples')
    .where({owner: id})

  return findAttributes(samples);
}

const findById = async id => {
  let sample = await db('voice_samples')
    .where({id});
  sample.attributes = await avs.findAll(sample.id);
  return sample;
}

const findByIdSimple = id => {
  return db('voice_samples')
    .where({id});
}

const findByFilter = async (filter) => {
  
  let samples = await db('voice_samples as vs')
    .join(
      'attributes_voice_samples as avs',
      'avs.voice_sample_id', '=', 'vs.id')
    .join(
      'attributes as attr',
      'attr.id', '=', 'avs.attribute_id')
    .select([
      'vs.id',
      'vs.owner',
      'vs.title',
      'vs.description',
      'vs.s3_location',
      db.raw('ARRAY_AGG(attr.title) as tags')
    ])
    .groupBy('vs.id')

  let checker = (arr, target) => target.every(v => arr.includes(v));

  samples = samples.filter(sample => {
    return checker(sample.tags, filter);
  })

  return samples;
}

// ** CLEANUP **
const findAll = async () => {
  const samples = await db('voice_samples')
    .select('id', 'title', 'description', 'rating', 's3_location');

  return findAttributes(samples);
}

const findAttributes = async samples => {
  return Promise.all(samples.map(async sample => {
    sample.attributes = await avs.findAll(sample.id);
    return sample;
  }))
}

const addSample = async (data) => {
  const [id] = await db('voice_samples')
    .insert(data)
    .returning('id');
  return findByIdSimple(id);
}

const updateSample = async (data) => {
  const [id] = await db('voice_samples')
    .where({id: data.id})
    .update(data)
    .returning('id');
  return findById(id);
}

const removeSample = async (id) => {
  const relations = await db('attributes_voice_samples')
    .where({voice_sample_id: id})
    .select('id');

  deleteRelations(relations);

  return await db('voice_samples')
    .where({id})
    .del();
}

const deleteRelations = async (relations) => {
  return Promise.all(relations.map(async relation => {
    return avs.remove(relation);
  }));
}

module.exports = {
  find,
  findById,
  findByIdSimple,
  findByFilter,
  addSample,
  updateSample,
  removeSample
}