// this is code for geocode api
const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiY2hhcmFueiIsImEiOiJjazg1d3QwbWgwMG1xM2ZyczlxaGJ1bXNzIn0.APfMrnGZnNgmxPZUv6ZlYg";
  request({ url: url, json: true }, (error, {body} ={}) => {
    if (error) {
      callback("check your internet connection", undefined);
    } else if (body.features.length === 0) {
      callback(
        "check the specified locataion or try with another location",
        undefined
      );
    } else {
      callback(undefined, body.features);
    }
  });
};
module.exports = geocode;