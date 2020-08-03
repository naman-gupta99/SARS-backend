import initialDatumRouter from "./routes/initial-datum";
import geoInfoRouter from "./routes/geo-info";
import searchPatternRouter from "./routes/search-pattern";

const router = (app) => {
  app.use("/initial-datum", initialDatumRouter);
  app.use("/geo-info", geoInfoRouter);
  app.use("/search-pattern", searchPatternRouter);
};

export default router;
