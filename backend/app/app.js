const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const env = require("./config/env");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/api", routes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;
