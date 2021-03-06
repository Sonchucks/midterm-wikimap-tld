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

router.get('/:id', (req, res) => {
  const id = req.session.userID
  if (req.session.userID) {
    if (id == req.params.id) {
        knex('users')
        .join("favorites", 'users.id', '=', 'favorites.user_id')
        .join("maps", 'maps.id', '=', 'favorites.map_id')
          .where({
            user_id: req.session.userID,
          })
          .then((favorites) => {
            knex('users')
              .join("contributions", 'users.id', '=', 'contributions.user_id')
              .join("maps", 'maps.id', "=", "contributions.map_id")
              .where({
                user_id: req.session.userID,
              })
              .then((contributions) => {

                console.log(favorites);
                console.log(contributions);
                res.render('user-view',{
                  favorites: favorites,
                  contributions: contributions,
                });
              });
            });
    } else {
      res.redirect('/maps');
    }
  } else {
    res.redirect('/');
}





});


  return router;
};




