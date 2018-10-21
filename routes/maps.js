const express = require('express');
const app  = express.Router();
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['userID']
}));


// Root = /maps

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

    // First fetch the name data for the correct map
    // then fetch the marker data for that map
    knex("maps")
      .distinct('maps.name', 'maps.description')
      .select()
      .where('maps.id', req.params.id)
      .then( (results) => {
        mapData = {
          map_name: results[0].name,
          map_description: results[0].description
        };
      })
      .then(() => {
        knex("markers")
          .join('maps', 'markers.map_id', '=', 'maps.id')
          .join('users', 'maps.creator_id', '=', 'users.id')
          .select("markers.content", "markers.coords", "markers.title", "markers.image_url")
          .where("maps.id", req.params.id)
          .then((mapDetails) => {
            let mapID = {id: req.params.id};
            let mapArray = mapDetails.map( (element) => {
              return {
                title: element.title,
                image_url: element.image_url,
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
    let mapData= {};

    knex("maps")
    .distinct('maps.name', 'maps.description')
    .select()
    .where('maps.id', req.params.id)
    .then( (results) => {
      mapData = {
        map_name: results[0].name,
        map_description: results[0].description
      };
    }).then( () => {
      knex("markers")
      .join('maps', 'markers.map_id', '=', 'maps.id')
      .join('users', 'maps.creator_id', '=', 'users.id')
      .select("*")
      .where("maps.id", req.params.id)
      .then((mapDetails) => {
          let mapID = {id: req.params.id};
          let mapArray = mapDetails.map( (element) => {
            return {
              title: element.title,
              image_url: element.image_url,
              coords: element.coords,
              content: element.content
            };
          });
          res.render('map-edit', {mapArray, mapID, mapData});
        });
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
    const mapId = req.params.id;
    const userId = req.session.userID;

    if(!req.body.update || !userId) {
      res.status(400);
      res.send();
    } else {
      const updates = req.body.update;
      res.status(201);
      res.send();

      knex('contributions')
      .select('*')
      .where('user_id', userId)
      .andWhere('map_id', mapId)
      .then(results => {
        if (results.length !== 0){
          console.log(`do nothing, contributor exists!`);
        } else {
          knex('contributions')
            .insert({
              user_id: userId,
              map_id: mapId
            }).then( () => {
              console.log(`contributor added!`);
            });
        }
      });

      knex('markers')
        .where('map_id', mapId)
        .del()
        .then( () => {
          for (let element of updates) {
            knex('markers')
              .insert({
                title: element.title,
                image_url: element.image,
                content: element.content,
                coords: element.coords,
                map_id: mapId
              })
              .then(function () {
                console.log('Update complete');
              });
          }
        });
    }
  });

  app.post('/:id/favorites', isAuthenticated, (req, res) => {
    const userId = req.session.userID;
    const mapId =  req.params.id;

    knex("favorites")
    .select("*")
    .where("user_id", userId)
    .andWhere("map_id", mapId)
    .then((results) => {
      if(results.length !== 0) {
        knex("favorites")
          .where("user_id", userId)
          .andWhere("map_id", mapId)
          .del()
          .then( () => {
            res.status(201).send();
            console.log(`Favorite deleted!`);
          });
      } else {
        knex
          .insert({
            user_id: userId,
            map_id: mapId
          })
          .returning("id")
          .into("favorites")
          .then(function (id) {
            res.status(201).send();
            console.log('Added to favorites');
          });
      }
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
};


