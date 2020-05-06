
exports.up = function(knex) {
  return knex.schema.createTable('attributes', table => {
		table
    	.increments();
		table
			.string('type'); 

		table
			.string('title');  

		table
			.string('description');
  })
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('attributes');
};
