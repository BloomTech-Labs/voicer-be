const db = require('../data/dbConfig.js');

const findAll = (id) => {
  return db('attributes_voice_samples')
    .where({sample_id: id})
    .select("id");
}

const findById = (id) => {
  return db('attributes_voice_samples')
    .where({id})
    .rightOuterJoin("attributes", "attribute_id", "attributes.id")
    .select("type", "title", "description");
}

const add = async (data) => {
  const [id] = await db('attributes_voice_samples')
    .insert(data)
    .returning('id');
  return [id] ? true : false;
}

const remove = async (id) => {
  return await db('attributes_voice_samples')
    .where({id})
    .del
}

module.exports = {
  findAll,
  findById,
  add,
  remove
}