
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorited_maps', function(table) {
        table.increments();
        table.integer("user_id");
        table.integer('map_id')
        table.foreign('user_id').references("users.id").onDelete("cascade");
        table.foreign('map_id').references('maps.id').onDelete('cascade');


    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("favorited_maps");
};
