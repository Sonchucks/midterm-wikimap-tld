"use strict";

const express = require('express');
const router  = express.Router();
const PORT = 8000;
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['userID']
}))

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}

app.get("/maps", (req, res) => {


});


app.get("/maps/:id" , (req, res) => {
  //-See one map in detail with option to edit
  //Click markers to get more information about locations

});

app.get("/maps/edit/:id", (req, res) => {
  //Display map edit form

});

app.get('/user/:id', (req, res) => {
//display user profile

})

app.get("/maps/new", (req, res) => {
//Display map edit form

});


app.get("/login/:id" , (req, res) => {
  req.session.userID = req.params.id;

res.redirect('/maps')
});

app.post('/maps', (req, res) => {
  
  //add a new map, redirect to /maps

  res.redirect('/maps');
});


app.put('/map/:id', (req, res) => {
  // Updates map redirect to /maps:id
  res.redirect("/maps/:id")
});




// function that checks the user is logged in 
function isAuthenticated(req, res, next) {
  if (req.params.id) {
    retrun next();
  } else {
    res.redirect("/login");
  }

}




