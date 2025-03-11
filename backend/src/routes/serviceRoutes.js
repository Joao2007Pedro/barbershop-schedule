const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.post('/services', servicesController.createService);

module.exports = router;