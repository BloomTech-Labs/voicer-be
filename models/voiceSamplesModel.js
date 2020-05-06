const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');

const find = async (id) => {
  // Find all voice samples where id = user.id
  let idArray = await db('voice_samples')
    .where({owner: id})
    .select('id');
  
  let samples = [];

  idArray.forEach(sample => {
    let temp = findById(sample);
    samples.push(temp);
  })

  return samples;
}

const findById = async (id) => {
  // Get voice sample
  const sample = await db('voice_samples')
    .where({id})
    .select("title", "description", "rating", "s3_location");
  
  // Get attribute voice sample id's
  const assoc = await avs.findAll(sample.id);

  // Create an array and push json objects for each attribute into it
  let attributes = [];
  assoc.forEach(association => {
    let temp = await avs.findById(association);
    attributes.push(temp);
  });

  // Set sample attributes to the json array
  sample.attributes = attributes;

  return sample;
}

const addSample = async (data) => {
  const [id] = await db('voice_samples')
                .insert(data)
                .returning('id');
  return findById(id);
}

const updateSample = async (data) => {
  const [id] = await db('voice_samples')
                .where({id: data.id})
                .update(data)
                .returning('id');
  return findById(id);
}

module.exports = {
  find,
  findById,
  addSample,
  updateSample
}