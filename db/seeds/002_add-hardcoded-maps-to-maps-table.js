
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps')
    .then(function () {
      return knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        knex('maps').insert({id: 51, name: 'Cool Places to Eat Around MTL', description: 'The MTL foodie scene is amazing, share your favorite eateries!', creator_id: 1}),
        knex('maps').insert({id: 52, name: 'Best Cities to Visit While You\'re Young!' , description: 'Where do you recommend travelling before settling down?', creator_id: 2}),
      ]);
    });
};
