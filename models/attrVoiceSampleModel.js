const db = require('../data/dbConfig.js');

const addAVS = async (data) => {
  return await db('attributes_voice_samples')
    .insert(data)
    .returning('id');
}

const remove = async (id, title) => {
  console.log("id, title", id, title)
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
  console.log("attrID: ", attrID)
  console.log("relationID: ", relationID)
  return db('attributes_voice_samples')
    .where({id: relationID.id})
    .del()
}

module.exports = {
  addAVS,
  remove
}