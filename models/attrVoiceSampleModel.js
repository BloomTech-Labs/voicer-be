const db = require('../data/dbConfig.js');
const attribute = require('./attributesModel.js');

const add = async (data) => {
  return await db('attributes_voice_samples')
    .insert(data)
    .returning('id');
}

const remove = async (id) => {
  return await db('attributes_voice_samples')
    .where({id})
    .del
}

module.exports = {
  add,
  remove
}