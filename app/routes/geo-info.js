import express from "express";
import ResponseTemplate from "../global/templates/response";
import contactSearch from "../global/utils/contact-search";
import getAddress from "../global/utils/reverse-geocoder";

const router = express.Router();

// @route  GET geo-info/get-contacts
// @desc   Get contacts of the services
// @access Private
router.get("/get-contacts/:longitude/:latitude", async (req, res) => {
  const contactDetails = await contactSearch(
    req.params.latitude,
    req.params.longitude
  );

  res
    .status(200)
    .json(ResponseTemplate.success("Contacts Found", contactDetails));
});

// @route  GET geo-info/get-location
// @desc   Get current location
// @access Private
router.get("/get-location/:longitude/:latitude", async (req, res) => {
  const locationDetails = await getAddress(
    req.params.latitude,
    req.params.longitude
  );

  res
    .status(200)
    .json(ResponseTemplate.success("Location Found", locationDetails));
});

export default router;
