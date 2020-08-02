import express from "express";
import ResponseTemplate from "../global/templates/response";
import initialDatumCalc from "../global/utils/initial-datum-calc";
import getSearchPattern from "../global/utils/search-pattern-map";

const router = express.Router();

// @route  GET initial-datum
// @desc   Get initial datum using LKP
// @access Private
router.post("/", (req, res) => {
  const datum = initialDatumCalc(req.body);

  res
    .status(200)
    .json(ResponseTemplate.success("Initial Datum Generated", datum));
});

export default router;
