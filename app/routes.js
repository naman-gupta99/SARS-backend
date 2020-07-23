import flightPlanRouter from "./routes/flight-plan";
import flightStateRouter from "./routes/flight-state";

const router = (app) => {
  app.use("/flight-plan", flightPlanRouter);
  app.use("/flight-state", flightStateRouter);
  console.log("Routers set up ...");
};

export default router;
