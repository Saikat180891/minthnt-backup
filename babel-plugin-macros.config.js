const path = require("path");

module.exports = {
  twin: {
    preset: "styled-components",
    config: path.join(__dirname, "tailwind.config.js"),
  },
};
