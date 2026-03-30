const express = require('express');
const router = express.Router();
const { obtenerTableros, crearTablero, editarTablero, eliminarTablero } = require('../controllers/tableroController');

router.get('/', obtenerTableros);
router.post('/', crearTablero);
router.put('/:id', editarTablero);
router.delete('/:id', eliminarTablero);

module.exports = router;