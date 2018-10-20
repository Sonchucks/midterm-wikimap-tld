$(function() {
  $('#favorite-frm').on('submit', function(event){
    event.preventDefault();
    const mapID = $(this).find('input[name=map_ID]').val();
    const options = {url: `/maps/${mapID}/favorites`, method: 'post', dataType: 'json', data: {mapID: mapID}};
    $('#favorite-confirm').slideDown('slow').delay(1500).slideUp('slow');

    $.ajax(options)
    .done(response => {
      return;
    })
    .fail(error => {
      return;
    });

  });
});
