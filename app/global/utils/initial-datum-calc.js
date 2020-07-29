const getProjectileDistance = (alt, v_x, v_y) => {
  const t2 = Math.pow(v_y, 2) + 2 * 9.8 * alt;
  const t1 = Math.sqrt(t2);
  const t = (v_y + t1) / 9.8;

  return v_x * t;
};

const getCoordinates = (lon, lat, dist, heading) => {
  const R = 6371000;

  const lat2 = Math.asin(
    Math.sin(lat) * Math.cos(dist / R) +
      Math.cos(lat) * Math.sin(dist / R) * Math.cos(heading)
  );

  const lon2 =
    lon +
    Math.atan2(
      Math.sin(heading) * Math.sin(dist / R) * Math.cos(lat),
      Math.cos(dist / R) - Math.sin(lat) * Math.sin(lat2)
    );

  return {
    longitude: lon2,
    latitude: lat2,
  };
};

const calculatePointofImpact = (req) => {
  const lon = req.longitude;
  const lat = req.latitude;
  const alt = req.altitude;
  const gSpeed = req.groundSpeed * 0.514444;
  const vSpeed = req.verticalSpeed * 0.00508;
  const heading = req.heading;

  const distance = getProjectileDistance(alt, gSpeed, vSpeed);

  return getCoordinates(lon, lat, distance, heading);
};

const initialDatumCalc = (req) => {
  let result = {
    circle: null,
    line: null,
  };

  if (req.stateOfCraft == 1) {
    // Circle
    result.circle = {};

    const pointOfImpact = calculatePointofImpact(req);
    result.circle.longitude = pointOfImpact.longitude;
    result.circle.latitude = pointOfImpact.latitude;

    result.circle.radius = 10000;
    result.circle.trustVal = 75;
  } else {
    // Line Datum
    result.line = {};

    const pointOfImpact = calculatePointofImpact(req);
    result.line.sourceLongitude = pointOfImpact.longitude;
    result.line.sourceLatitude = pointOfImpact.latitude;

    result.line.destinationLongitude = req.destinationLongitude;
    result.line.destinationLatitude = req.destinationLatitude;

    result.width = 10000;
    result.trustVal = 75;
  }

  return result;
};

export default initialDatumCalc;
