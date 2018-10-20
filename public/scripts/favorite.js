$(function() {
    console.log('ready');
  $('#favorite-frm').on('submit', function(event){
    event.preventDefault();
    console.log('on submit');

    const mapID = $(this).find('input[name=map_ID]').val();
    const options = {url: `/maps/${mapID}/favorites`, method: 'post', dataType: 'json', data: {mapID: mapID}};

    $.ajax(options)
    .done(response => {
     console.log(response);
     $('#favorite-confirm').slideDown('slow').delay(1500).slideUp('slow');
    })
    .fail(error => {
      console.log("Error: ", error);
    });

  });
});
