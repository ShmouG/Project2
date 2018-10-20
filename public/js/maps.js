const googleMapsClient = require("@google/maps").createClient({
  key: dataKeys.gmaps,
  Promise: Promise
});
googleMapsClient
  .geocode({ address: "1600 Amphitheatre Parkway, Mountain View, CA" })
  .asPromise()
  .then(function(response) {
    console.log(response.json.results);
  })
  .catch(function(err) {
    console.log(err);
  });
createClient();
