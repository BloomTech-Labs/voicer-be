const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');
const attributes = require('./attributesModel.js');

// Find all voice samples where id = user.id
const find = async (id) => {
  let samples = await db('voice_samples as vs')
    .where({owner: id})
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
      db.raw('ARRAY_AGG(attr.title) as tags')
    ])
    .groupBy('vs.id')
  return samples;
}

const findById = async id => {
  let sample = await db('voice_samples as vs')
    .where({id})
    .join(
      'attributes_voice_samples as avs',
      'avs.voice_sample_id', '=', 'vs.id'
    )
    .join(
      'attributes as attr',
      'attr.id', '=', 'avs.attribute_id'
    )
    .select([
      'vs',
      db.raw('ARRAY_AGG(attr.title) as tags')
    ])
    .groupBy('vs.id')

  return sample;
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
  addSample,
  updateSample,
  removeSample
}