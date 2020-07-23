import express from "express";

import FlightPlan from "../models/FlightPlan";
import ResponseTemplate from "../global/templates/response";

const router = express.Router();

// @route  GET flight-plan/:planId
// @desc   Get a flight-plan by planId
// @access Private

router.get("/:planId", (req, res) => {
  FlightPlan.findOne({
    planId: req.params.planId,
  })
    .then((flightPlan) => {
      if (flightPlan == null) {
        throw new Error("Flight Plan Not Found");
      }
      res
        .status(200)
        .json(ResponseTemplate.success("Flight Plan Found", flightPlan));
    })
    .catch((err) =>
      res
        .status(404)
        .json(ResponseTemplate.error(404, "Some Error Occured", err))
    );
});

export default router;
