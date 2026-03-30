const { Tablero, Lista, Tarjeta } = require('../models');

async function obtenerTableros(req, res) {
  try {
    var tableros = await Tablero.findAll({
      where: { UsuarioId: req.usuarioId },
      include: {
        model: Lista,
        as: 'listas',
        include: {
          model: Tarjeta,
          as: 'tarjetas'
        }
      }
    });
    res.json(tableros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tableros', detalle: error.message });
  }
}

async function crearTablero(req, res) {
  try {
    var { titulo } = req.body;
    if (!titulo) return res.status(400).json({ error: 'El titulo es obligatorio' });
    var tablero = await Tablero.create({ titulo, UsuarioId: req.usuarioId });
    res.status(201).json(tablero);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tablero', detalle: error.message });
  }
}

async function editarTablero(req, res) {
  try {
    var tablero = await Tablero.findOne({ where: { id: req.params.id, UsuarioId: req.usuarioId } });
    if (!tablero) return res.status(404).json({ error: 'Tablero no encontrado' });
    await tablero.update({ titulo: req.body.titulo });
    res.json(tablero);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar tablero', detalle: error.message });
  }
}

async function eliminarTablero(req, res) {
  try {
    var tablero = await Tablero.findOne({ where: { id: req.params.id, UsuarioId: req.usuarioId } });
    if (!tablero) return res.status(404).json({ error: 'Tablero no encontrado' });
    await tablero.destroy();
    res.json({ mensaje: 'Tablero eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tablero', detalle: error.message });
  }
}

module.exports = { obtenerTableros, crearTablero, editarTablero, eliminarTablero };