
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
      .string('status')
      .defaultTo("open");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs');
};
