const { Lista, Tablero } = require('../models');

// POST /api/tableros/:tableroId/listas
async function crearLista(req, res) {
  try {
    var tablero = await Tablero.findOne({ where: { id: req.params.tableroId, UsuarioId: req.usuarioId } });
    if (!tablero) return res.status(404).json({ error: 'Tablero no encontrado' });

    var lista = await Lista.create({ titulo: req.body.titulo, TableroId: tablero.id });
    res.status(201).json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear lista', detalle: error.message });
  }
}

// PUT /api/tableros/:tableroId/listas/:id
async function editarLista(req, res) {
  try {
    var lista = await Lista.findOne({ where: { id: req.params.id, TableroId: req.params.tableroId } });
    if (!lista) return res.status(404).json({ error: 'Lista no encontrada' });

    await lista.update({ titulo: req.body.titulo });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar lista', detalle: error.message });
  }
}

// DELETE /api/tableros/:tableroId/listas/:id
async function eliminarLista(req, res) {
  try {
    var lista = await Lista.findOne({ where: { id: req.params.id, TableroId: req.params.tableroId } });
    if (!lista) return res.status(404).json({ error: 'Lista no encontrada' });

    await lista.destroy();
    res.json({ mensaje: 'Lista eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lista', detalle: error.message });
  }
}

module.exports = { crearLista, editarLista, eliminarLista };