const express = require('express');
const router = express.Router();

const serviceRoutes = require('./serviceRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
// Adicione outras rotas aqui, se necessário

router.use('/api/services', serviceRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);

module.exports = router;

