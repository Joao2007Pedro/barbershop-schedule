const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const indexRoutes = require("./src/routes/indexRoutes"); // Importando o arquivo centralizado de rotas
const sequelize = require("./src/config/sequelize");
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes); // Usando o arquivo centralizado de rotas

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

app.set("port", config.port);

module.exports = app;
