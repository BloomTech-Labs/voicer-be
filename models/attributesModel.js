const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');

const find = async voice_sample_id => {
  const attrID = await db('attributes_voice_samples as avs')
    .where({voice_sample_id})
    .select('attribute_id')
  let attributes = await Promise.all(attrID.map(async id => {
    return await db('attributes')
      .where({id: id.attribute_id})
      .first()
      .select('title')
  }))
  attributes = attributes.map(attr => {
    return attr.title
  })
  return attributes
}

const findById = (id) => {
  return db('attributes')
    .where({id})
    .select("id", "title")
    .first();
}

const createAttribute = async data => {
  const [id] = await db('attributes')
    .insert(data)
    .returning('id')
  return findById(id)
}

const addAttributeToSample = async (id, title) => {
  let attribute;
  const [attrID] = await db('attributes')
    .where({title})
    .first()
    .select('id');
  if(attrID) {
    attribute = await findById(attrID)
  } else {
    attribute = await createAttribute(title)
  }
  const avsData = {
    voice_sample_id: id,
    attribute_id: attribute.id
  }
  return await avs.add(avsData);
}

const edit = async (id, data) => {
  return await db('attributes')
    .where({id})
    .first()
    .update(data)
    .returning('id');
}

const remove = async (id) => {
  return await db('attributes')
    .where({id})
    .del();
}

module.exports = {
  find,
  findById,
  createAttribute,
  addAttributeToSample,
  edit,
  remove
}