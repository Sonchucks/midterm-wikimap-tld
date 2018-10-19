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

  // List all created maps
  app.get("/", (req, res) => {
    const id = req.session.userID;

    knex
    .select("*")
    .from("maps")
    .then((maps) => {
      res.render('map-list', {maps, id});
    });
  });

  // Redirect to root
  app.get('/view', isAuthenticated, (req, res) => {
      res.redirect('/maps');
  });

  // Gets new map form if user is authenticated
  app.get('/new', isAuthenticated, (req, res) => {
    res.render("map-new");
  });

  // -- Show a map in detail
  app.get("/:id", (req, res) => {
    const id = req.session.userID;
    let mapData = {};

    let mapDetails = {};
    knex("maps")
    .distinct('maps.name', 'maps.description')
    .select()
    .where('maps.id', req.params.id)
    .then( (results) => {
      mapData = {
        map_name: results[0].name,
        map_description: results[0].description
      };
    }).then(() => {
      knex("markers")
      .join('maps', 'markers.map_id', '=', 'maps.id')
      .join('users', 'maps.creator_id', '=', 'users.id')
      .select("markers.content", "markers.coords")
      .where("maps.id", req.params.id)
      .then((mapDetails) => {
          let mapID = {id: req.params.id};
          let mapArray = mapDetails.map( (element) => {
            return {
              coords: element.coords,
              content: element.content
            };
          });
        res.render('map-view', {mapArray, id, mapID, mapData});
      });

    });
  });

  // -- Allows a user to access the edit form if they are authenticated
  app.get("/edit/:id", isAuthenticated, (req, res) => {
    let mapDetails = {};
    knex("markers")
    .join('maps', 'markers.map_id', '=', 'maps.id')
    .join('users', 'maps.creator_id', '=', 'users.id')
    .select("*")
    .where("maps.id", req.params.id)
    .then((mapDetails) => {
        let mapID = {id: req.params.id};
        let mapArray = mapDetails.map( (element) => {
          return {
            name: element.name,
            description: element.description,
            coords: element.coords,
            content: element.content
          };
        });
        res.render('map-edit', {mapArray, mapID});
      });
  });


  // -- Creates a new map
  app.post('/', isAuthenticated, (req, res) => {
    const newTitle = req.body.title;
    const newDesc = req.body.description;
    const userID = req.session.userID;
    knex
      .insert({
        name: newTitle,
        description: newDesc,
        creator_id: userID
      })
      .returning('id')
      .into('maps')
      .then(function (id) {
        const mapID = id[0];
        res.redirect(`/maps/edit/${mapID}`);
      });
});

  // -- Add new markers to a map
  app.put('/:id', isAuthenticated, (req, res) => {
    if(!req.body.update) {
      res.status(400);
      res.send();
    } else {
      const updates = req.body.update;
      res.status(201);
      res.send();
      knex('markers')
        .where('map_id', req.params.id)
        .del()
        .then( () => {
          for (let element of updates) {
            knex('markers')
              .insert({
                content: element.content,
                coords: element.coords,
                map_id: req.params.id
              })
              .then(function () {
                console.log('Update complete');
              });
          }
        });
    }
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
};

