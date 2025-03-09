const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");

const app = express();

app.use(cors());
app.use(express.json());

app.set("port", config.port);

module.exports = app;
