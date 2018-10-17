"use strict";

const express = require('express');
const router  = express.Router();
const PORT = 8000;

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/maps", isAuthenticated, (req, res) => {

  });


  router.get("/maps/:id",isAuthenticated, (req, res) => {


    //-See one map in detail with option to edit
    //Click markers to get more information about locations



  });

  router.get("/maps/edit/:id", isAuthenticated, (req, res) => {
    //Display map edit form

  });

  router.get('/user/:id', isAuthenticated, (req, res) => {
  //display user profile

  })

  router.get("/maps/new", isAuthenticated, (req, res) => {
  //Display map edit form

  });


  router.get("/login/:id" , (req, res) => {
    req.session.userID = req.params.id;
    res.status(201).send();
  res.redirect('/maps')
  });

  router.post('/maps', isAuthenticated, (req, res) => {

    //add a new map, redirect to /maps

    res.redirect('/maps');
  });


  router.put('/maps/:id', isAuthenticated, (req, res) => {
    // Updates map redirect to /maps:id
    res.redirect("/maps/:id")
  });




  // function that checks the user is logged in
  function isAuthenticated(req, res, next) {
    if (req.params.id) {
      return next();
    } else {
      console.log('Redirect to login');
      res.redirect("/login");
    }

  }
  return router;
}



