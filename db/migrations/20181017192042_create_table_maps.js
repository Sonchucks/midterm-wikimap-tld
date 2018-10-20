
exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
        table.increments();
        table.string('name');
        table.string('description');
        table.integer('creator_id');
        table.foreign('creator_id').references('users.id').onDelete("cascade");
      });
    };

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
