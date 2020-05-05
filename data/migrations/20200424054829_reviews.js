
exports.up = function(knex) {
  return knex.schema.createTable('reviews', table => {
    table
      .increments();
    table
      .integer('author_id')
      .notNullable();
    table
      .integer('recipient_id')
      .notNullable();
    table
      .integer('job_id')
      .notNullable();
    table
      .float('rating')
      .notNullable();
    table
      .string('message', 512);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reviews');
};
