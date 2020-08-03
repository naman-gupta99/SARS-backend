import config from "../../../config";
import geocoder from "google-geocoder";

// const geocoder = require('google-geocoder');
// const config = require("./config.js");

const reverseGeo = async(lati, longi, callback) => {
    const geo = geocoder({
	key: config.google.apiKey
    });

    geo.reverseFind(lati, longi, function(err, res) {
	if (err) throw err;
	callback(res[0]);
    });
}

export default reverseGeo;

// reverseGeo(43.70418445395268, -79.76029111296589, function(res) {
//     console.log(res);
// });
