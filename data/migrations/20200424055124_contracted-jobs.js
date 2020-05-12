
exports.up = function(knex) {
  return knex.schema.createTable('contracted_jobs', table => {
    table
      .increments();
    table
      .string('display_name')
      .notNullable();
    table
      .integer('job_id')
      .notNullable();
    table
      .string('application_status')
      .defaultTo('submitted');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contracted_jobs');
};
