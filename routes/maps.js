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

app.get('/new', isAuthenticated, (req, res) => {
  res.render("map-new");
});

app.get('/api', (req, res) => {
  knex("markers")
  .join('maps', 'markers.map_id', '=', 'maps.id')
  .join('users', 'maps.creator_id', '=', 'users.id')
  .select("*")
  .then((markers) => {
    res.json(markers);
  });
});

app.get("/:id",isAuthenticated, (req, res) => {
  //-See one map in detail with option to edit
  //Click markers to get more information about locations
  let mapDetails = {};
  knex("markers")
  .join('maps', 'markers.map_id', '=', 'maps.id')
  .join('users', 'maps.creator_id', '=', 'users.id')
  .select("*")
  .where("maps.id", req.params.id)
  .then((mapDetails) => {
    if (mapDetails.length === 0) {
      res.status(404);
      res.send();
    } else {
      let mapArray = mapDetails.map( (element) => {
        return {
          coords: element.coords,
          content: element.content
        };
      });

      console.log(mapArray);
      res.render('map-view', {mapArray});
    }
  });

});

app.get("/edit/:id", isAuthenticated, (req, res) => {

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

