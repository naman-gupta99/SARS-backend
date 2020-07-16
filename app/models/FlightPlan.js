import mongoose from "mongoose";

const flightPlanSchema = mongoose.Schema({
  planId: {
    type: String,
    require: true,
    unique: true,
  },
  source: {
    type: String,
    require: true,
  },
  destination: {
    type: String,
    require: true,
  },
  flightPath: {
    type: Array,
    require: true,
    unique: true,
  },
});

export default mongoose.model("FlightPlan", flightPlanSchema);
