const { Tarjeta, Lista, Tablero } = require('../models');

async function crearTarjeta(req, res) {
  try {
    var { titulo, descripcion, color } = req.body;
    if (!titulo) return res.status(400).json({ error: 'El titulo es obligatorio' });

    var lista = await Lista.findByPk(req.params.listaId, {
      include: { model: Tablero, as: 'tablero' }
    });

    if (!lista) return res.status(404).json({ error: 'Lista no encontrada' });
    if (lista.tablero.UsuarioId !== req.usuarioId) return res.status(403).json({ error: 'No autorizado' });

    var tarjeta = await Tarjeta.create({
      titulo,
      descripcion: descripcion || '',
      color: color || '#4f6ef7',
      ListaId: req.params.listaId
    });

    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarjeta', detalle: error.message });
  }
}

async function editarTarjeta(req, res) {
  try {
    var tarjeta = await Tarjeta.findOne({ where: { id: req.params.id, ListaId: req.params.listaId } });
    if (!tarjeta) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    await tarjeta.update({ titulo: req.body.titulo, descripcion: req.body.descripcion });
    res.json(tarjeta);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar tarjeta', detalle: error.message });
  }
}

async function eliminarTarjeta(req, res) {
  try {
    var tarjeta = await Tarjeta.findOne({ where: { id: req.params.id, ListaId: req.params.listaId } });
    if (!tarjeta) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    await tarjeta.destroy();
    res.json({ mensaje: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarjeta', detalle: error.message });
  }
}

module.exports = { crearTarjeta, editarTarjeta, eliminarTarjeta };