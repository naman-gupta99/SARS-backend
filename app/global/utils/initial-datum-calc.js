// ---- Get Radius/Width of Datum
const meansOfNavErr = {
  GNSS: 0.1,
  Radar: 1,
  Visual_fix: 1,
  Celestial_fix: 2,
  Marine_radio_beacon: 4,
  LORAN_C: 1,
  INS: 0.5,
  VOR: 0.5,
  TACAN: 0.5,
};

const craftError = {
  Ship: 5,
  Submarine: 5,
  Aircraft_3: 5,
  Aircraft_2: 10,
  Aircraft_1: 15,
  Submersible: 15,
  Boat: 15,
};

const craftDRError = {
  Ship: 1.05,
  Submarine: 1.05,
  Aircraft_3: 1.05,
  Aircraft_2: 1.1,
  Aircraft_1: 1.15,
  Submersible: 1.15,
  Boat: 1.15,
};

const evalNonDRError = (req) => {
  if (req.meansOfNavigation == "Unknown") {
    return craftError[req.typeOfCraft];
  } else {
    return meansOfNavErr[req.typeOfCraft];
  }
};

const evalDRError = (req) => {
  if (req.meansOfNavigation == "Unknown") {
    return craftDRError[req.typeOfCraft] * craftError[req.typeOfCraft];
  } else {
    return craftDRError[req.typeOfCraft] * meansOfNavErr[req.meansOfNavigation];
  }
};

const getCraftError = (req) => {
  // --- Distressed Craft Error
  const X = evalDRError(req.distressedCraft);

  // --- Search Craft Error
  let Y = 0;
  if (req.searchFacilityUsesDRNav) {
    Y = evalDRError(req.searchCraft);
  } else {
    Y = evalNonDRError(req.searchCraft);
  }

  return {
    X: X,
    Y: Y,
  };
};

const getDriftError = (lkpTime) => {
  return (+new Date() - lkpTime) / 7200000;
};

// ---- Get Latitude of Datum
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

    const craftErrors = getCraftError(req);
    result.circle.x = craftErrors.X;
    result.circle.y = craftErrors.Y;

    const driftError = getDriftError(req.timestampLKP);
    result.circle.driftError = driftError;
    result.circle.trustVal = 75;
  } else {
    // Line Datum
    result.line = {};

    const pointOfImpact = calculatePointofImpact(req);
    result.line.sourceLongitude = pointOfImpact.longitude;
    result.line.sourceLatitude = pointOfImpact.latitude;

    result.line.destinationLongitude = req.socScenario.longitude;
    result.line.destinationLatitude = req.socScenario.latitude;

    const craftErrors = getCraftError(req);
    result.line.x = craftErrors.X;
    result.line.y = craftErrors.Y;

    const driftError = getDriftError(req.timestampLKP);
    result.line.driftError = driftError;
    result.line.trustVal = 75;
  }

  return result;
};

export default initialDatumCalc;
