const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const indexRoutes = require("./src/routes/indexRoutes"); // Importando o arquivo centralizado de rotas
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes); // Usando o arquivo centralizado de rotas

app.set("port", config.port);

module.exports = app;
