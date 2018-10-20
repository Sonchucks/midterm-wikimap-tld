
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributions').del()
    .then (function () {
        return knex('favorites').del();
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('favorites').insert({user_id: 1, map_id: 51}),
        knex('favorites').insert({user_id: 2, map_id: 52}),
        knex('favorites').insert({user_id: 3, map_id: 51}),
        knex('favorites').insert({user_id: 4, map_id: 52}),
        knex('contributions').insert({user_id: 1, map_id: 52}),
        knex('contributions').insert({user_id: 2, map_id: 51}),
        knex('contributions').insert({user_id: 3, map_id: 52}),
        knex('contributions').insert({user_id: 4, map_id: 51}),
      ]);
    });
};
