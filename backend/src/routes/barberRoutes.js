const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

router.get('/', barberController.getAllBarbers);


module.exports = router;