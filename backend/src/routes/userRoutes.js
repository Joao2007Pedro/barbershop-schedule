const express = require("express");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", roleMiddleware.verificaAdm, userController.getAllUsers);

module.exports = router;