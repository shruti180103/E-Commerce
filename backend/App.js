const express = required("express");
const app = express();
const cookieparser = require("cookie-parser");

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

module.exports = app