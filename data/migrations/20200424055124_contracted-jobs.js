
exports.up = function(knex) {
  return knex.schema.createTable('contracted_jobs', table => {
    table
      .increments();
    table
      .integer('contractor_id')
      .notNullable();
    table
      .integer('job_id')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contracted_jobs');
};
