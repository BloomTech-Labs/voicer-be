const db = require('../data/dbConfig.js');
const attributes = require('./attributesModel.js');

const findById = (id) => {
  return db('attributes_voice_samples')
    .where({ id });
}

const add = async (data) => {
  const [id] = await db('attributes_voice_samples')
                      .insert(data)
                      .returning('id');
  return [id] ? true : false;
}

const remove = async (id) => {
  // Store information about target AVS row in data
  const data = await findById(id);

  // Delete the associated attribute
  const attrDel = attributes.remove(data.attribute_id);

  // Delete the AVS row
  const avsDel = await db('attributes_voice_samples')
                        .where({'id': data.id})
                        .del();
  
  // Return true if both deletions were successful
  return (attrDel && (avsDel > 0));
}

module.exports = {
  findById,
  add,
  remove
}