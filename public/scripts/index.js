'use strict';

$( document ).ready(function() {
  $('#view-maps').click(function(){
    window.location = "/maps"
  });

  $('#login').click(function(){
    window.location = "/login";
  });

  $('.map-list').click(function() {
    window.location = "/maps";
  });

});
