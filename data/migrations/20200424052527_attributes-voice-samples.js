
exports.up = function(knex) {
  return knex.schema.createTable('attributes_voice_samples', table => {
    table
      .increments();
    table
      .integer('attribute_id')
      .notNullable();
    table
      .integer('voice_sample_id')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attributes_voice_samples');
};
