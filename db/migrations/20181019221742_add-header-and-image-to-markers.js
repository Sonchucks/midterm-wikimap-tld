
exports.up = function(knex, Promise) {
  return knex.schema.table('markers', function (table) {
    table.string("title")
    table.string("image_url");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('markers', function (table) {
    table.dropColumn("title")
    table.dropColumn("image_url");
  });

};
