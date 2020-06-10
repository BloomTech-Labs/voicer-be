const db = require('../data/dbConfig.js');

const addAVS = async (data) => {
  return await db('attributes_voice_samples')
    .insert(data)
    .returning('id');
}

const remove = async (id, title) => {
  const attrID = await db('attributes')
    .where({title})
    .first()
    .select('id')
  const relationID = await db('attributes_voice_samples as avs')
    .where({
      voice_sample_id: id,
      attribute_id: attrID.id
    })
    .first()
    .select('id')
  return db('attributes_voice_samples')
    .where({id: relationID.id})
    .del()
}

module.exports = {
  addAVS,
  remove
}