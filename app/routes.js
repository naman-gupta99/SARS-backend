import initialDatumRouter from "./routes/initial-datum";
import geoInfoRouter from "./routes/geo-info";

const router = (app) => {
  app.use("/initial-datum", initialDatumRouter);
  app.use("/geo-info", geoInfoRouter);
};

export default router;
