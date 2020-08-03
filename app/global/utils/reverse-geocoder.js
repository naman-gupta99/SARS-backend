import request from "request";
import config from "../../../config";

const reverseGeo = (lat, lon) => {
  return new Promise((resolve, reject) => {
    let uri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    uri = uri + lat + "," + lon + "&key=" + config.google.apiKey;
    // console.log(uri);
    request.get(uri, (err, res, body) => {
      if (err) {
        console.log(err);
        resolve("err");
      } else {
        body = JSON.parse(body);
        //console.log(body);
        resolve(body.results[0].formatted_address);
      }
    });
  });
};
const getAddress = async (lat, lon) => {
  const x = await reverseGeo(lat, lon);
  // console.log(x);
  return x;
};

// getAddress(28.0, 77,0);

export default getAddress;
