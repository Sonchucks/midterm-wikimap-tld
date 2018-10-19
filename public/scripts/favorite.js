$(function() {
    console.log('ready');
$('#favorite-frm').on('submit', function(event){
event.preventDefault()
console.log('on submit');

const mapID = $(this).find('input[name=mapID]').val(); 
const options = {url: `/maps/${mapID}/favorites`, method: 'post', dataType: 'json', data: {mapID: mapID}};

$.ajax(options)
.done(response => {
 console.log(response);  
})
.fail(error => {
  console.log("Error: ", error);
});

  })
})




