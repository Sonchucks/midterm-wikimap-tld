
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function(table){
    table.increments();
    table.string('description');
    table.specificType('coords', 'REAL[]');
    table.integer('map_id');
    table.foreign('map_id').references('maps.id');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};
