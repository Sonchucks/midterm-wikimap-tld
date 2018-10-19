const users = [{"username":"Alice","email":"alice@gmail.com","password":"214$!@5697124$!@$"},{"username":"Bob","email":"bob@gmail.com","password":"847518hadsf!@#51#!@"},{"username":"Charlie","email":"charlie@gmail.com","password":"5325#%1#23$!@#%"}];

users.forEach(user, function(){
    knex('users').insert(user)

});



