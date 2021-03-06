/**
 * TODO:
 * [ ] find a working http clint [thunder clint, postman, rest clint, ...]
 * [ ] test for what done and what to do
 * [ ] put a schedule
 * ////////////////////////////////////////
 * [x] api up and running
 * [ ] user routes
 * [ ] admin routes
 * [ ] messages routes
 * [ ] rooms routes
 */

require("dotenv").config();
require("express-async-errors");

const express = require("express");

const connectDB = require("./DB/connectDB");

const { ErrorHandler } = require("./middlewares");

// require routes
const adminRoutes = require("./routes/admin");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// main routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("welcome to my api");
});

app.use(ErrorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App listen to port : ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
