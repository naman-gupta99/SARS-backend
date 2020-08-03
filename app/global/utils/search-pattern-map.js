import request from "request";
import getTerrain from "./terrain-utils";
import getSearchPattern from "./search-pattern";

const getBoundingBox = (long, lat, radius, trustVal) => {
  long = parseFloat(long);
  lat = parseFloat(lat);
  radius = parseFloat(radius);
  trustVal = parseInt(trustVal);

  return new Promise((resolve, regect) => {
    const uri = "https://cv-sih.herokuapp.com/rect";

    request.post(
      uri,
      {
        body: JSON.stringify({
          circles: [{ center: [lat, long], radius: radius, trust: trustVal }],
          line: [],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      (err, res, body) => {
        if (err) {
          resolve(err);
        } else {
          resolve(body);
        }
      }
    );
  });
};

const getSearchPatternMap = async (long, lat, radius, trustVal) => {
  let res = {};

  res.box = await getBoundingBox(long, lat, radius, trustVal);

  const terrain = await getTerrain(long, lat);
  const large_radius = radius > 20;
  const location_accuracy = trustVal > 65;

  res.searchPattern = getSearchPattern(
    terrain,
    large_radius,
    location_accuracy
  );

  res.terrain = terrain;

  return res;
};

export default getSearchPatternMap;
