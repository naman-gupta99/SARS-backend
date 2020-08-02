var assert = require("assert");
var config = require("./config.js");
var GooglePlaces = require("googleplaces");

const contactSearch = async(lati, longi, amenity, callback) => {
    let results = [];

    var googlePlaces = new GooglePlaces(config.apiKey, config.outputFormat);
    var parameters;

    /**
     * Place details requests - https://developers.google.com/places/documentation/#PlaceDetails
     */
    parameters = {
	location:[lati, longi],
	types:amenity,
	rankby:"distance"
    };

    const placeDetailFunc = async(error, response) => {
	if (error) throw error;
	assert.equal(response.status, "OK", "Place details request response status is OK");
	results.push(response.result);
    }

    const placeSearchFunc = async(error, response) => {
	if (error) throw error;
	for (i = 0; i != 3; i++) {
	    googlePlaces.placeDetailsRequest({reference:response.results[i].reference,
					      fields:"name,formatted_phone_number,international_phone_number,formatted_address,url,website,geometry"},
					     placeDetailFunc);
	}
    }

    await googlePlaces.placeSearch(parameters, placeSearchFunc);

    function waitForIt() {
        if (results.length < 3) {
            setTimeout(function(){waitForIt()},100);
        } else {
	    // console.log(results);
	    callback(results);
	    // return results;
        };
    }

    waitForIt();
}

// const test = async() => {
//     await contactSearch(-33.8670522, 151.1957362, "hospital",
// 			function(results) {console.log(results);});
// }

// test();
