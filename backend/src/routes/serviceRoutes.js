const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.post('/api/services', servicesController.createService);

module.exports = router;