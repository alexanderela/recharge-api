exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stations', table => {
      table.increments('id').primary();
      table.string('station_name');
      table.string('station_phone');
      table.decimal('latitude');
      table.decimal('longitude');
      table.string('street_address');
      table.string('city');
      table.string('state');
      table.string('zip_code');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('cafes', table => {
      table.increments('id').primary();
      table.string('cafe_name');
      table.string('street_address');
      table.string('city');
      table.string('state');
      table.string('zip_code');
      table.string('cross_street');
      table.string('formatted_address');
      table.integer('distance_in_meters').unsigned();
      table.integer('station_id').unsigned();
      table.foreign('station_id')
        .references('stations.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cafes'),
    knex.schema.dropTable('stations')
  ]);
};
