const db = require('../data/dbConfig.js');

const addAVS = async (data) => {
  // Create relation using voice sample id and attribute id
  return await db('attributes_voice_samples')
    .insert(data)
    .returning('id');
}
// Function to delete an attribute / voice sample relation
const remove = async (id, title) => {
  // Get id of attribute
  const attrID = await db('attributes')
    .where({title})
    .first()
    .select('id')
  // Get relation id by using voice sample id and attribute id
  const relationID = await db('attributes_voice_samples as avs')
    .where({
      voice_sample_id: id,
      attribute_id: attrID.id
    })
    .first()
    .select('id')
  // Delete relation
  return db('attributes_voice_samples')
    .where({id: relationID.id})
    .del()
}

module.exports = {
  addAVS,
  remove
}