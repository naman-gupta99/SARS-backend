import config from "../../../config";

import assert from "assert";
import GooglePlaces from "googleplaces";

// const assert = require("assert");
// const GooglePlaces = require('googleplaces');
// const config = require("./config.js");

const placeDetailsRequestWrapper = (response, index) => {
    return new Promise((resolve, reject) => {
	const googlePlaces = new GooglePlaces(config.apiKey, "json");
	googlePlaces.placeDetailsRequest({reference:response.results[i].reference,
					  fields:"name,formatted_phone_number,international_phone_number,formatted_address,url,website,geometry"},
					 (error, response) => {
					     if (error) {
						 console.log(error);
						 resolve("error");
					     }
					     else {
						 resolve(response.result);
					     }
					 });
    });
}

const contactSearch = async (lati, longi, amenity) => {
    return new Promise((resolve, reject) => {
	const googlePlaces = new GooglePlaces(config.apiKey, "json");
	const parameters = {
	    location:[lati, longi],
	    types:amenity,
	    rankby:"distance"
	};
	googlePlaces.placeSearch(parameters,  async (error, response) => {
	    if (error) {
		console.log(error);
		resolve("Error");
	    }
	    else {
		let places = [];
		for (i = 0; i != 3; i++) {
		    place = await placeDetailsRequestWrapper(response, i);
		    // console.log(place);
		    places.push(place);
		}
		resolve(places);
	    }
	});
    });
}

export default contactSearch;

// const test = async() => {
//     const results = await contactSearch(-33.8670522, 151.1957362, "hospital");
//     console.log(results);
// }

// test();
