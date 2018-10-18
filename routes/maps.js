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
  .then((markers) => {
    if (markers.length === 0) {
      res.status(404);
      res.send();
    } else {
    mapDetails = markers;
    res.json(mapDetails);
    }
  });

});

app.get("/edit/:id", isAuthenticated, (req, res) => {
  // console.log("function is running")
  // knex('maps')
  // .where('id' , req.params.id)
  // .then((sql_data) => {
  //    console.log("This is sql data:",sql_data);
  // })
  // .catch(function(error){
  //   console.log("this is an error:",error)
  //  })
  //  .finally(()=> {
  //    console.log('this is working')
  //    knex.destory();
  //  })
  res.render('index')
});



app.post('/', isAuthenticated, (req, res) => {
  const newTitle = req.body.title
  const newDesc = req.body.description
  const userID = req.session.userID
  knex.insert({
    name: newTitle, 
    description: newDesc,
    creator_id: userID
  }) 
  .returning('id')
  .into('maps')
  .then(function (id) {
    const mapID = id[0]
    res.redirect(`/maps/edit/${mapID}`);
  }); 
});



app.put('/:id', isAuthenticated, (req, res) => {
  // Updates map redirect to :id
  res.redirect("/:id")
});



// function that checks the user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.userID) {
      return next();
    } else {
      res.redirect('/');
    }

  }


return app;
}

