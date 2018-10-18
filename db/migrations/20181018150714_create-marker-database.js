
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function(table){
    table.increments();
    table.string('description');
  });

};

exports.down = function(knex, Promise) {

};
