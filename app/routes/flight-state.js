import express from "express";
import request from "request";
import socketIo from "socket.io-client";

import FlightServer from "../models/FlightServer";
import ResponseTemplate from "../global/templates/response";

const router = express.Router();

let planeStates = {};

// @route GET flight-state/init/:flightId
// @desc   Initialize a flight server
// @access Private
router.post("/init/:flightId", (req, res) => {
  FlightServer.findOne({
    flightId: req.params.flightId,
  })
    .then((flightServer) => {
      if (flightServer == null) {
        throw new Error("Flight Not Found");
      }

      let socket = socketIo(flightServer.serverUri);

      socket.on("state", (res) => {
        planeStates[flightServer.flightId] = res;
      });

      const initUri = flightServer.serverUri + "/flight-state/init";

      request.post(
        {
          url: initUri,
        },
        (error, response, body) => {
          if (error) {
            throw new Error(error);
          }
          res.status(200).json(ResponseTemplate.success("Flight Initialized"));
        }
      );
    })
    .catch((err) =>
      res
        .status(404)
        .json(ResponseTemplate.error(404, "Some Error Occured", err))
    );
});

// @route  GET flight-state/:flightId
// @desc   Get a flight-state by flightId
// @access Private
router.get("/:flightId", (req, res) => {
  const flightId = req.params.flightId;
  res
    .status(200)
    .json(ResponseTemplate.success("Flight State", planeStates[flightId]));
});

export default router;
