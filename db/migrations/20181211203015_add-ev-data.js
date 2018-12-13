exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('stations', table => {
      table.string('ev_connector_type');
      table.string('ev_network');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('stations', table => {
      table.dropColumn('ev_connector_type'),
      table.dropColumn('ev_network');
    })
  ]);
};