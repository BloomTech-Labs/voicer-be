const db = require('../data/dbConfig.js');
const avs = require('./attrVoiceSampleModel.js');

const find = (id) => {
  return db('voice_samples')
    .where({"owner": id});
}

const findById = (id) => {
  return db('voice_samples')
    .where({id});
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

const deleteSample = async (id) => {
  // get associations
  const assoc = await getAVS(id);
  
  // delete each association
  assoc.forEach(association => {
    if(!avs.remove(association)) {
      // return false if error
      return false;
    }
  })

  // delete voice sample
  const deleted = await db('voice_samples')
                          .where(id)
                          .del();

  // return true if deleted
  return deleted > 0;
}

const getAVS = async (id) => {
  const arr = await db('attributes_voice_samples')
                      .where({
                        'voice_sample_id': id
                      })
                      .select('id');
  return arr;
}

module.exports = {
  find,
  findById,
  addSample,
  updateSample,
  deleteSample
}