
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers')
    .then(function () {
      return knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({title: "Mount Royal", image_url: "https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg", content: 'This marker is on Mount Royal! Neat!', coords: [45.501895, -73.602819], map_id: 1}),
        knex('markers').insert({title: "Somewhere Else", image_url: "https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg", content: 'This marker is somewhere else!', coords: [55.501895, -74.602819], map_id: 1}),
        knex('markers').insert({title: "Mysterious...", image_url: "https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350", content: 'Where is this marker?', coords: [60.50, -83.602819], map_id: 2}),
        knex('markers').insert({title: "My Marker!", image_url: "https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg", content: 'I have a marker too!', coords: [80.501895, -10.602819], map_id: 3})
      ]);
    });
};
