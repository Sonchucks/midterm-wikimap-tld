'use strict';

$( document ).ready(function() {
  $('#favorite').click(function(){
    $('.list-group').slideToggle( "slow", function() {});
  });
});
