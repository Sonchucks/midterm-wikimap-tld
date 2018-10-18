'use strict';

$( document ).ready(function() {
  $('.login').click(function(){
    window.location = "/login";
  });

  $('.view-maps').click(function(){
    window.location = "/maps";
  });

  $('.map-list').click(function() {
    window.location = "/maps";
  });

  $('.edit').click(function() {
    window.location = "/";
  });

});
