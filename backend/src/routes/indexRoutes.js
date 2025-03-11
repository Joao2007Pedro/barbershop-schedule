const express = require('express');
const router = express.Router();

const serviceRoutes = require('./serviceRoutes');
// Adicione outras rotas aqui, se necessário

router.use('/', serviceRoutes);

module.exports = router;

