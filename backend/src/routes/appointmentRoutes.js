// Rotas para operações relacionadas a agendamentos
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Definição das rotas para agendamentos
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointmentStatus);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;