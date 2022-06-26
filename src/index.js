require("dotenv").config();
require("express-async-errors");

const express = require("express");

const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// main routes
app.use("/", (req, res) => {
  res.send("welcome to my api");
});
app.use("/api/v1/users", authRouter);

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
