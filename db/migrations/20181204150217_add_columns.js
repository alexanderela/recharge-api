exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('stations', table => {
      table.string('intersection_directions');
      table.string('access_days_time');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('stations', table => {
      table.dropColumn('access_days_time'),
      table.dropColumn('intersection_directions');
    })
  ]);
};
