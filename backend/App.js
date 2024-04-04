const express = required("express");
const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

module.exports = app