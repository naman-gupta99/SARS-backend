import express from "express";

import config from "./config";
import bootstrap from "./app/bootstrap";
import middleware from "./app/middleware";
import router from "./app/routes";

const app = express();

bootstrap();
middleware(app);
router(app);

app.listen(config.app.port);
console.log(`Listening on port ${config.app.port}...`);

export default app;
