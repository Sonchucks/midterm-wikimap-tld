const express = require('express');
const app  = express.Router();
const PORT = 8000;
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

// / = maps

module.exports = (knex) => {

app.get("/", isAuthenticated, (req, res) => {
  knex
  .select("*")
  .from("maps")
  .then((maps) => {
    console.log(maps);
    res.render('map-list', {maps});

  });
});


app.get('/view', isAuthenticated, (req, res) => {
    res.render('map-view');
});



app.get("/:id",isAuthenticated, (req, res) => {


  //-See one map in detail with option to edit
  //Click markers to get more information about locations



});

app.get("/edit/:id", isAuthenticated, (req, res) => {
  //Display map edit form

});


app.get("/new", isAuthenticated, (req, res) => {
//Display map edit form
});


app.post('/', isAuthenticated, (req, res) => {

  //add a new map, redirect to

});


app.put('/:id', isAuthenticated, (req, res) => {
  // Updates map redirect to :id
  res.redirect("/:id")
});



// function that checks the user is logged in
function isAuthenticated(req, res, next) {
    if (req.params.id) {
      return next();
    } else {
      return next();
    }

  }


return app;
}

