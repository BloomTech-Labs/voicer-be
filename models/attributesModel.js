const db = require('../data/dbConfig.js');

const findById = (id) => {
  return db('attributes')
    .where({id})
    .select("type", "title", "description")
    .first();
}

const add = async (data) => {
  const [id] = await db('attributes')
    .insert(data)
    .returning('id');
  
  return findById(id);
}

const edit = async (id, data) => {
  return await db('attributes')
    .where({id})
    .update(data)
    .returning('id');
}

const remove = async (id) => {
  return await db('attributes')
    .where({id})
    .del();
}

module.exports = {
  findById,
  add,
  edit,
  remove
}