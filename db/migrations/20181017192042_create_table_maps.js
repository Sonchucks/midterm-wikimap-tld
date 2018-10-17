
exports.up = function(knex, Promise) {
    return knex.schema.createTable('maps', function (table) {
        table.increments();
        table.string('name');
        table.string('description');
        table.integer('creator_id')
      });
    };
};

exports.down = function(knex, Promise) {
  
};
