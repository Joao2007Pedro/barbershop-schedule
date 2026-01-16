// Rotas para operações relacionadas a agendamentos
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { validateCreate, validateUpdateStatus } = require('../middlewares/validateAppointmentPayload');

// Definição das rotas para agendamentos
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', validateCreate, appointmentController.createAppointment);
router.put('/:id', validateUpdateStatus, appointmentController.updateAppointmentStatus);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;