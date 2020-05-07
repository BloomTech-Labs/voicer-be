const db = require('../data/dbConfig.js');
const attribute = require('./attributesModel.js');

const findAll = async (id) => {
  const associations = await db('attributes_voice_samples')
    .where({voice_sample_id: id})
  return Promise.all(associations.map(async assoc => {
    return attribute.findById(assoc.attribute_id);
  }))
}

const findById = (id) => {
  return db('attributes_voice_samples')
    .where({id})
    .rightOuterJoin("attributes", "attributes.id", "attribute_id")
    .select("type", "title", "description");
}

const add = async (data) => {
  return db('attributes_voice_samples')
    .insert(data)
    .returning('id');
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