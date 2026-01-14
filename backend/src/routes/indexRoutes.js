// Rotas principais da aplicação
const express = require('express');
const router = express.Router();

// Importa as rotas específicas
const serviceRoutes = require('./serviceRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const barberRoutes = require('./barberRoutes');
const appointmentRoutes = require('./appointmentRoutes');
// Adicione outras rotas aqui, se necessário

// Monta as rotas na aplicação
router.use('/api/services', serviceRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/barber', barberRoutes);
router.use('/api/appointment', appointmentRoutes);

module.exports = router;

