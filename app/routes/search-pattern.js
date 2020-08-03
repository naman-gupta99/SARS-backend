import express from "express";
import ResponseTemplate from "../global/templates/response";
import getSearchPattern from "../global/utils/search-pattern-map";

const router = express.Router();

// @route  GET initial-datum
// @desc   Get initial datum using LKP
// @access Private
router.get("/:long/:lat/:radius/:trust", async (req, res) => {
  const p = req.params;
  const datum = await getSearchPattern(p.long, p.lat, p.radius, p.trust);

  res
    .status(200)
    .json(ResponseTemplate.success("Initial Datum Generated", datum));
});

export default router;
