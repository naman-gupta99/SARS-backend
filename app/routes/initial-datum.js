import express from "express";
import ResponseTemplate from "../global/templates/response";

const router = express.Router();

// @route  GET initial-datum
// @desc   Get initial datum using LKP
// @access Private
router.get("/", (req, res) => {
  const datum = {
    longitude: 74,
    latitude: 17,
    radius: 21,
    trustVal: 75,
  };
  res
    .status(200)
    .json(ResponseTemplate.success("Initial Datum Generated", datum));
});

export default router;
