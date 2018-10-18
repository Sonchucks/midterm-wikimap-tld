
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers')
    .then(function () {
      return knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({content: 'This marker is on Mount Royal! Neat!', coords: [45.501895, -73.602819], map_id: 1}),
        knex('markers').insert({content: 'This marker is somewhere else!', coords: [55.501895, -74.602819], map_id: 1}),
        knex('markers').insert({content: 'Where is this marker?', coords: [60.50, -83.602819], map_id: 2}),
        knex('markers').insert({content: 'I have a marker too!', coords: [80.501895, -10.602819], map_id: 3})
      ]);
    });
};
