require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`App listen to port : ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
