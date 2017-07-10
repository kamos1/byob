
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('employees', (table) => {
      table.string('name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('employees', (table) => {
      table.dropColumn('name');
    })
  ]);
};
