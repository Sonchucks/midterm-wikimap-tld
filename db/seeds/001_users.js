exports.seed = function(knex, Promise) {
  return knex('markers').del()
    .then(function () {
      return knex('maps').del();
    })
    .then(function () {
      return knex('users').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'Alice', email: 'alice@gmail.com', password: '214$!@5697124$!@$'}),
        knex('users').insert({username: 'Bob', email: 'bob@gmail.com', password: 'bob'}),
        knex('users').insert({username: 'Charlie', email: 'charlie@gmail.com', password: '5325#%1#23$!@#%'}),
        knex('users').insert({username: 'David Son', email: 'hyun.uk.son@gmail.com', password: 'password'})
      ]);
    });
};
