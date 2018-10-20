
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers')
    .then(function () {
      return knex.raw('ALTER SEQUENCE markers_id_seq RESTART WITH 1');
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markers').insert({title: "Montreal", image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0e/1f/2d/2b/montreal-attraction-pass.jpg", content: 'See Mount Royal in the Fall!', coords: [45.487597, -73.554966], map_id: 52}),
        knex('markers').insert({title: "London", image_url: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&h=350", content: 'Take a selfie with Big Ben!', coords: [51.507346, -0.127759], map_id: 52}),
        knex('markers').insert({title: "Singapore", image_url: "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F150806121501-sg-50---lead-image.jpg", content: 'Malls and dumplings that will make you never want to leave!', coords: [1.347168, 103.867318], map_id: 52}),
        knex('markers').insert({title: "Berlin", image_url: "https://www.visitberlin.de/system/files/styles/visitberlin_bleed_header_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=2YXS5_33", content: 'Biers and brats!', coords: [52.517936, 13.402820], map_id: 52}),
        knex('markers').insert({title: "Ma Poule Mouillee", image_url: "https://www.mtlblog.com/uploads/278599_7932d7c11e39923516fd807204f95c1d9e28cb85.jpg", content: "The best poutine in the city is portuguese, and it's delicious and cheap, just like everything here!", coords: [45.525158, -73.575280], map_id: 51}),
        knex('markers').insert({title: "Antep Kebap", image_url: "https://mtlfoodsnob.files.wordpress.com/2014/01/dsc00533.jpg", content: "Small and out of the way, this eatery serves the tastiest kebab sandwiches you can find, with home-baked bread!", coords: [45.495200, -73.579547], map_id: 51}),
        knex('markers').insert({title: "McDonalds", image_url: "http://m.mcdonalds.ie/content/iehome/food/_jcr_content/genericpagecontent/everything/image.img.jpg/1461671551117.jpg", content: "Personally recommended by David, you won't find better food near Lighthouse Labs elsewhere...", coords: [45.495710, -73.570817], map_id: 51}),
        knex('markers').insert({title: "Misoya", image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/bOoVCXwfn5jPRGipUWF9mQ/348s.jpg", content: "Authentic hearty ramen, perfect for surviving Montreal winters!", coords: [45.497775, -73.578500], map_id: 51}),
      ]);
    });
};
