// this is code for darksky api
const request = require("request");

const darksky = (latitude, longitude, callback) => {
  const url =
    " https://api.darksky.net/forecast/39ec5d5efc23716bf0ef6bd14d8682ea/" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("check your internet connection", undefined);
    } else if (body.code === 400) {
      callback(
        "check the specified location or try another locaton",
        undefined
      );
    } else {
      
      callback(undefined,body.currently)
    }
  });
};
module.exports = darksky;