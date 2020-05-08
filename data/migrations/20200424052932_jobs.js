
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table
      .increments();
    table
      .integer('creator')
      .notNullable();
    table
      .string('title')
      .notNullable();
    table
      .string('description', 512)
      .notNullable();
    table
      .float('payrate')
      .notNullable();
    table
      .boolean('status') // Is the job open:true or closed:false
      .defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs');
};
