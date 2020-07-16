import mongoConnect from "./bootstrap/mongodb";

const bootstrap = () => {
  mongoConnect();
};

export default bootstrap;
