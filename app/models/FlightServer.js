import mongoose from "mongoose";

const flightServerSchema = mongoose.Schema({
  flightId: {
    type: String,
    require: true,
    unique: true,
  },
  serverUri: {
    type: String,
    require: true,
  },
});

export default mongoose.model("FlightServer", flightServerSchema);
