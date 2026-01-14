// Rotas para operações relacionadas a usuários
const express = require("express");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

// Definição das rotas para usuários
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;