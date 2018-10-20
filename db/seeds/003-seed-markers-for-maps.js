
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers')
    .then(function () {
      return knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({title: "Mount Royal", image_url: "https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg", content: 'This marker is on Mount Royal! Neat!', coords: [45.501895, -73.602819], map_id: 2}),
        knex('markers').insert({title: "Somewhere Else", image_url: "https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg", content: 'This marker is somewhere else!', coords: [55.501895, -74.602819], map_id: 2}),
        knex('markers').insert({title: "Mysterious...", image_url: "https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350", content: 'Where is this marker?', coords: [60.50, -83.602819], map_id: 2}),
        knex('markers').insert({title: "My Marker!", image_url: "https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg", content: 'I have a marker too!', coords: [80.501895, -10.602819], map_id: 3}),
        knex('markers').insert({title: "Ma Poule Mouillee", image_url: "https://www.mtlblog.com/uploads/278599_7932d7c11e39923516fd807204f95c1d9e28cb85.jpg", content: "The best poutine in the city is portuguese, and it's delicious and cheap, just like everything here!", coords: [45.525158, -73.575280], map_id: 1}),
        knex('markers').insert({title: "Antep Kebap", image_url: "https://mtlfoodsnob.files.wordpress.com/2014/01/dsc00533.jpg", content: "Small and out of the way, this eatery serves the tastiest kebab sandwiches you can find, with home-baked bread!", coords: [45.495200, -73.579547], map_id: 1}),
        knex('markers').insert({title: "McDonalds", image_url: "http://m.mcdonalds.ie/content/iehome/food/_jcr_content/genericpagecontent/everything/image.img.jpg/1461671551117.jpg", content: "Personally recommended by David, you won't find better food near Lighthouse Labs elsewhere...", coords: [45.495710, -73.570817], map_id: 1}),
        knex('markers').insert({title: "Misoya", image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/bOoVCXwfn5jPRGipUWF9mQ/348s.jpg", content: "Authentic hearty ramen, perfect for surviving Montreal winters!", coords: [45.497775, -73.578500], map_id: 1}),
      ]);
    });
};
