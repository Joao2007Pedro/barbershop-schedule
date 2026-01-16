const express = require("express");
const cors = require("cors");
const config = require("./src/config/config");
const indexRoutes = require("./src/routes/indexRoutes"); // Importando o arquivo centralizado de rotas
const sequelize = require("./src/config/sequelize");
// Carregar modelos e associações antes de sync
require("./src/models/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes); // Usando o arquivo centralizado de rotas

// Middleware global de erros (deve vir após as rotas)
const errorMiddleware = require('./src/middlewares/errorMiddleware');
app.use(errorMiddleware);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tabelas criadas!");
});

app.set("port", config.port);

module.exports = app;
