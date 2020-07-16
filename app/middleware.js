// Middleware for Application
import bodyParser from "body-parser";
import expressSession from "express-session";
import cors from "cors";
import helmet from "helmet";
import configServer from "../config";

// Function to exclude Endpoints that
// shouldn't passs through the middleware
const unless = (path, middleware) => {
  return function (req, res, next) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

const middlewareFunctions = (app) => {
  app.set("port", process.env.PORT || configServer.app.PORT);
  // adding security fixes
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(helmet.noSniff()); // set X-Content-Type-Options header
  app.use(helmet.frameguard()); // set X-Frame-Options header
  app.use(helmet.xssFilter()); // set X-XSS-Protection header
  app.enable("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
  app.use(cors());

  app.use(
    expressSession({
      name: "SESS_ID",
      secret: configServer.app.SESSION_SECRET,
      // store: new Filestore({ path: './sessions' }),
      resave: true,
      saveUninitialized: false,
    })
  );
};

export default middlewareFunctions;
