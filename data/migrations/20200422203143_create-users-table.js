
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .string('password')
      .notNullable();
    table
      .string('first_name')
      .notNullable();
    table
      .string('last_name')
      .notNullable();
    table
      .string('display_name')
      .notNullable()
      .unique();
    table
      .float('payrate')
      .defaultTo(0.00);
    table
      .string('location')
      .defaultTo("The Internet");
    table
      .integer('jobsCompleted')
      .defaultTo(0);
    table
      .string('bio')
      .defaultTo("");
		table
      .float('average_rating')
      .defaultTo(null);
		table
      .float('account_balance')
      .defaultTo(0.00);
    table
      .boolean('active')
      .defaultTo(true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};