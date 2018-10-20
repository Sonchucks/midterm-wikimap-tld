
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function(table){
    table.increments();
    table.string('content');
    table.specificType('coords', 'REAL[]');
    table.integer('map_id');
    table.foreign('map_id').references('maps.id').onDelete("cascade");
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};
