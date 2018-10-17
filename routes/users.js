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



