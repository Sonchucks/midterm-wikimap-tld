
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps')
    .then(function () {
      return knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        knex('maps').insert({name: 'Cool Places to Eat Around MTL', description: 'The MTL foodie scene is amazing, share your favorite eateries!', creator_id: 1}),
        knex('maps').insert({name: 'Top Ten Cities to Visit While You\'re Young!' , description: 'Where do you recommend travelling before settling down?', creator_id: 2}),
        knex('maps').insert({name: 'Cool Kittens', description: 'I saw some cool kittens in these spots.', creator_id: 3})
      ]);
    });
};
