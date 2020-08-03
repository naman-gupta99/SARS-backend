import request from "request";
import config from "../../../config";

const getPlacesDetail = (placeId) => {
  return new Promise((resolve, reject) => {
    const uri =
      "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
      placeId +
      "&fields=name,formatted_phone_number,international_phone_number,formatted_address,url,website,geometry&key=" +
      config.google.apiKey;
    request.get(uri, function (error, response) {
      if (error) throw new Error(error);
      const body = JSON.parse(response.body);
      resolve(body.result);
    });
  });
};

const getPlaces = (lat, long, type) => {
  return new Promise((resolve, reject) => {
    const uri =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      long +
      "&rankby=distance&type=" +
      type +
      "&key=" +
      config.google.apiKey;

    request.get(uri, function (error, response) {
      if (error) throw new Error(error);
      const body = JSON.parse(response.body);
      let results = [];
      const l = Math.min(3, body.results.length);
      for (let i = 0; i < l; i++) {
        results = [...results, body.results[i].place_id];
      }

      resolve(results);
    });
  });
};

const contactSearch = async (lat, long) => {
  let res = {};

  // Police
  const placeIdsPolice = await getPlaces(lat, long, "police");
  res.police = [];
  for (let i = 0; i < placeIdsPolice.length; i++) {
    const result = await getPlacesDetail(placeIdsPolice[i]);
    res.police = [...res.police, result];
  }

  // Hospital
  const placeIdsHospital = await getPlaces(lat, long, "hospital");
  res.hospital = [];
  for (let i = 0; i < placeIdsHospital.length; i++) {
    const result = await getPlacesDetail(placeIdsHospital[i]);
    res.hospital = [...res.hospital, result];
  }

  // Fire Dept
  const placeIdsFire = await getPlaces(lat, long, "fire_station");
  res.fire = [];
  for (let i = 0; i < placeIdsFire.length; i++) {
    const result = await getPlacesDetail(placeIdsFire[i]);
    res.fire = [...res.fire, result];
  }

  // Airport
  const placeIdsAir = await getPlaces(lat, long, "airport");
  res.air = [];
  for (let i = 0; i < placeIdsAir.length; i++) {
    const result = await getPlacesDetail(placeIdsAir[i]);
    res.air = [...res.air, result];
  }

  return res;
};

export default contactSearch;
