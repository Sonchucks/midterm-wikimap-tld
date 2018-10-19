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

  app.get("/", (req, res) => {
    const id = req.session.userID;

    knex
    .select("*")
    .from("maps")
    .then((maps) => {
      console.log(maps);
      res.render('map-list', {maps, id});
    });
  });

  app.get('/view', isAuthenticated, (req, res) => {
      res.redirect('/maps');
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
  app.get("/:id", (req, res) => {
    const id = req.session.userID;

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
        let mapID = {id: req.params.id};
        let mapArray = mapDetails.map( (element) => {
          return {
            name: element.name,
            description: element.description,
            coords: element.coords,
            content: element.content
          };
        });
        res.render('map-view', {mapArray, id, mapID});
      }
    });
  });

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
                name: element.name,
                description: element.description,
                coords: element.coords,
                content: element.content
              };
            });
            res.render('map-edit', {mapArray, mapID, mapData});
          });
      });
    });



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
        res.redirect(`/maps`);
      });
});


  app.put('/:id', isAuthenticated, (req, res) => {
    // Updates map redirect to :id
    res.redirect("/:id")
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

