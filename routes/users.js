"use strict";

const express = require('express');
const router  = express.Router();
const PORT = 8000;
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['userID']
}));


module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/login', (req, res) => {
    const eMail = req.body.email;
    const password = req.body.password;

    knex('users')
      .where({
        email: eMail,
        password: password
      })
      .then((results) => {
        for (var key in results) {
          return results[key].id;
        }
      })
      .then((id) => {
        if (id) {
          req.session.userID = id;
          res.redirect("/maps");
        }
        res.send("Something's Wrong!");
      });
  });

 
 
  // .join('maps', 'markers.map_id', '=', 'maps.id')
//       .join('users', 'maps.creator_id', '=', 'users.id')

router.get('/:id', (req, res) => {
  // const userName = req.body.userID
  // const favoritedMaps = req.body.favoritedMaps
  
  knex('users')
  .join("favorites", 'users.id', '=', 'favorites.user_id')
    .where({
      user_id: req.session.userID, 
    })
    .then((results) => {
      console.log("These are my,", results);
    })
    




  res.render('user_view')
});



  return router;


  
}




