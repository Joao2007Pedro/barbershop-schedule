// Rotas para operações relacionadas a barbeiros
const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barberController');
const { validateCreate, validateUpdate } = require('../middlewares/validateBarberPayload');

// Definição das rotas para barbeiros
router.get('/', barberController.getAllBarbers);
router.get('/:id', barberController.getBarberById);
router.post('/', validateCreate, barberController.createBarber);
router.put('/:id', validateUpdate, barberController.updateBarber);
router.delete('/:id', barberController.deleteBarber);


module.exports = router;