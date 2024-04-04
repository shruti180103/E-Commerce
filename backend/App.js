const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieparser = require("cookie-parser");

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;