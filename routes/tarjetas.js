const express = require('express');
const router = express.Router({ mergeParams: true });
const { crearTarjeta, editarTarjeta, eliminarTarjeta } = require('../controllers/tarjetaController');

router.post('/', crearTarjeta);
router.put('/:id', editarTarjeta);
router.delete('/:id', eliminarTarjeta);

module.exports = router;