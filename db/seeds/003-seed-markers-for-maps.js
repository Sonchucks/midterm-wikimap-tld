
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers')
    .then(function () {
      return knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({description: 'This marker is on Mount Royal! Neat!', coords: [45.501895, -73.602819], map_id: 1})
      ]);
    });
};
