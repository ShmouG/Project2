console.log("this is loaded");

require("dotenv").config();

exports.gmaps = {
  api: process.env.Google_maps_key
};
// let gmaps =  googleMapsClient(dataKeys.gmaps);
