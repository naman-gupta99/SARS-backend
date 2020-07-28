import initialDatumRouter from "./routes/initial-datum";

const router = (app) => {
  app.use("/initial-datum", initialDatumRouter);
};

export default router;
