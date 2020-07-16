import flightPlanRouter from "./routes/flight-plan";

const router = (app) => {
  app.use("/flight-plan", flightPlanRouter);
  console.log("Routers set up ...");
};

export default router;
