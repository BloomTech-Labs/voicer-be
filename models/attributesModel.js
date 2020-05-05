const db = require('../data/dbConfig.js');

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
  const deleted = await db('attributes')
                        .where({id})
                        .del();
  return deleted > 0;
}

module.exports = {
  findById,
  add,
  remove
}