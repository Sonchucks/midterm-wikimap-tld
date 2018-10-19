const express = require('express');
const app  = express.Router();
const PORT = 8000;
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['userID']
}));
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

  // -- Show a map in detail
  app.get("/:id",isAuthenticated, (req, res) => {
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
            name: element.name,
            description: element.description,
            coords: element.coords,
            content: element.content
          };
        });
        res.render('map-view', {mapArray, mapID:req.params.id});
      }
    });
  });

  app.get("/edit/:id", isAuthenticated, (req, res) => {
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
            name: element.name,
            description: element.description,
            coords: element.coords,
            content: element.content
          };
        });
        res.render('map-edit', {mapArray});
      }
    });
  });



  app.post('/', isAuthenticated, (req, res) => {

    //add a new map, redirect to

  });


  app.put('/:id', isAuthenticated, (req, res) => {
    // Updates map redirect to :id
    res.redirect("/:id")
  });


  app.post('/:id/favorites', isAuthenticated, (req, res) => {
    const userId = req.session.userID;
    const mapId =  req.params.id;
    
    console.log("These are my vars", userId, mapId);


    knex.insert({
      user_id: userId,
      map_id: mapId
    })
    .returning("id")
    .into("favorites")
    .then(function (id) {
      res.redirect(`/maps/${mapId}`);
    }); 

  });


// function that checks the user is logged in
function isAuthenticated (req, res, next) {
    if (req.session.userID) {
      return next();
    } else {
      res.redirect('/');
    }
  }

  return app;
}

