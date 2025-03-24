const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

router.get('/', barberController.getAllBarbers);
router.get('/:id', barberController.getBarberById);
router.post('/', barberController.createBarber);


module.exports = router;