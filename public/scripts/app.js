$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

// go to views on click
$( document ).ready(function() {
  $('.list').click(function() {
    alert( "Handler for .click() called." );
    });
    
  });

