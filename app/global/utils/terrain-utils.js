import request from "request";
import config from "../../../config";

const checkWaterBody = (lon, lat) => {
  return false;
};

const getRandomCoordinates = (lon, lat) => {
  let res = [];
  for (let i = 0; i < 10; i++) {
    let arr = [lat + (Math.random() - 0.5) / 10];
    arr = [...arr, lon + (Math.random() - 0.5) / 10];
    res = [...res, arr];
  }
  return res;
};

const average = (data) => {
  var sum = data.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
};

const standardDeviation = (values) => {
  var avg = average(values);

  var squareDiffs = values.map(function (value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
};

const evalTerrain = (profile) => {
  let values = [];
  profile.forEach((element) => {
    values = [...values, element.elevation];
  });

  const sd = standardDeviation(values);
  if (sd < 100) {
    return "flat";
  } else {
    return "mountain";
  }
};

const checkTerrain = (lon, lat) => {
  return new Promise((resolve, reject) => {
    const checkCoords = getRandomCoordinates(lon, lat);
    let uri = "https://maps.googleapis.com/maps/api/elevation/json?locations=";

    checkCoords.forEach((element) => {
      uri = uri + element[0] + "," + element[1] + "|";
    });

    uri = uri.slice(0, -1);

    uri = uri + "&key=" + config.google.apiKey;

    request.get(uri, (err, res, body) => {
      if (err) {
        console.log(err);
        resolve("err");
      } else {
        body = JSON.parse(body);
        resolve(evalTerrain(body.results));
      }
    });
  });
};

const getTerrain = async (lon, lat) => {
  if (checkWaterBody(lon, lat) == false) {
    const x = await checkTerrain(lon, lat);
    return x;
  } else {
    return "Sea";
  }
};

export default getTerrain;
