exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('jobs', function(table){
			table.increments('id').primary();
			table.string('title');
			table.timestamps(true, true);
		}),

		knex.schema.createTable('employees', function(table) {
			table.increments('id').primary();
			table.string('fullname');
			table.string('first_name');
			table.string('last_name');
			table.integer('salary');
			table.integer('job_id').unsigned();
			table.foreign('job_id')
				.references('jobs.id');
			table.timestamps(true,true);
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('employees'),
    knex.schema.dropTable('jobs')
  ]);
};
