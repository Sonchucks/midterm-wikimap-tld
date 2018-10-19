'use strict';

$( document ).ready(function() {
  $('.login-button').click(function(){
    $('.login-form').slideToggle('slow', function () {});
  });

  $('.view-maps').click(function(){
    window.location = "/maps";
  });

  $('.map-list').click(function() {
    window.location = "/maps";
  });

  // $('.edit').click(function() {
  //   window.location = "/";
  // });

});
