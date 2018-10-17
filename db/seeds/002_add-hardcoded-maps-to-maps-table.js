
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps')
    .then(function () {
      return knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        knex('maps').insert({name: 'Map 1', description: 'This is my first map!', creator_id: 1}),
        knex('maps').insert({name: 'Map 2', description: 'This is my second map!', creator_id: 2}),
        knex('maps').insert({name: 'Map 3', description: 'This is my third map!', creator_id: 3})
      ]);
    });
};
