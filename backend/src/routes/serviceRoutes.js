// Rotas para operações relacionadas a serviços
const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { validateCreate, validateUpdate } = require('../middlewares/validateServicePayload');

// Definição das rotas para serviços
router.post('/', validateCreate, servicesController.createService);
router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.put('/:id', validateUpdate, servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;