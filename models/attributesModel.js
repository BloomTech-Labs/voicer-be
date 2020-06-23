const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');
const voice = require('./voiceSamplesModel');

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
    .first()
    .select("id", "title")
}

const createAttribute = async data => {
  const attData = {
    title: data
  }
  const [id] = await db('attributes')
    .insert(attData)
    .returning('id')
  return findById(id)
}

const addAttributeToSample = async (data) => {
  const { id, title } = data;
  let attribute;
  const [attrID] = await db('attributes')
      .where({title})
      .select('id');
  if(attrID) {
    attribute = await findById(attrID.id)
  } else {
    attribute = await createAttribute(title)
  }
  const avsData = {
    attribute_id: attribute.id,
    voice_sample_id: id
  }

  if(await checkForDuplicates(avsData)) {
    return await avs.addAVS(avsData);
  } else {
    return null;
  }
}

const checkForDuplicates = async data => {
  const { attribute_id, voice_sample_id } = data;
  let checker = true;
  const a_i_d = await db('attributes_voice_samples')
    .where({voice_sample_id})
    .select('attribute_id')
  a_i_d.forEach(aid => {
    if(aid.attribute_id == attribute_id) {
      checker = false;
    }
  })
  return checker
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