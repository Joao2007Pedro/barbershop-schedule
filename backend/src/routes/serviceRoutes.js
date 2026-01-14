// Rotas para operações relacionadas a serviços
const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Definição das rotas para serviços
router.post('/', servicesController.createService);
router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;