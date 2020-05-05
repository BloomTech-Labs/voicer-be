
exports.up = function(knex) {
	return knex.schema.createTable('voice_samples', table => {
		table
			.increments();
		table
			.integer('owner')
			.notNullable();
		table
			.string('title', 128)
			.notNullable();
		table
			.string('description', 512)
			.notNullable();
		table
			.float('rating')
			.defaultTo(null);
		table
			.string('s3_location')
			.notNullable()
			.unique();
	})
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('voice_samples');
};
