// Babel Setup Script
require("babel-register")({
  presets: ["env"],
});
require("babel-polyfill");
require("./server.js");