const express = require('express');
const router = express.Router({ mergeParams: true });
const { crearLista, editarLista, eliminarLista } = require('../controllers/listaController');

router.post('/', crearLista);
router.put('/:id', editarLista);
router.delete('/:id', eliminarLista);

module.exports = router;