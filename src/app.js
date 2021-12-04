require("dotenv").config();
const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

module.exports = app;
