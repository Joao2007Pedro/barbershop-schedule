// Rotas para operações relacionadas a barbeiros
const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');

// Definição das rotas para barbeiros
router.get('/', barberController.getAllBarbers);
router.get('/:id', barberController.getBarberById);
router.post('/', barberController.createBarber);
router.put('/:id', barberController.updateBarber);
router.delete('/:id', barberController.deleteBarber);


module.exports = router;