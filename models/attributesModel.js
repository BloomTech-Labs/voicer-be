const db = require('../data/dbConfig.js');

const find = () => {
  return db('attributes');
}

const findById = (id) => {
  return db('attributes')
    .where({id})
    .select("type", "title", "description");
}

const add = async (data) => {
  const [id] = await db('attributes')
    .insert(data)
    .returning('id');
  return findById(id);
}

const remove = async (id) => {
  return await db('attributes')
    .where({id})
    .del();
}

module.exports = {
  find,
  findById,
  add,
  remove
}