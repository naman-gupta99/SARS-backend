var geocoder = require('google-geocoder');
var config = require("./config.js");

const reverseGeo = async(lati, longi, callback) => {
    const geo = geocoder({
	key: config.apiKey
    });

    geo.reverseFind(lati, longi, function(err, res) {
	if (err) throw err;
	callback(res[0]);
    });
}

// reverseGeo(43.70418445395268, -79.76029111296589, function(res) {
//     console.log(res);
// });
