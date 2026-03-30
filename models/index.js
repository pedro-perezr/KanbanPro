const Usuario = require('./usuario');
const Tablero = require('./tablero');
const Lista = require('./lista');
const Tarjeta = require('./tarjeta');

Usuario.hasMany(Tablero, { foreignKey: 'UsuarioId', as: 'tableros' });
Tablero.belongsTo(Usuario, { foreignKey: 'UsuarioId', as: 'usuario' });

Tablero.hasMany(Lista, { foreignKey: 'TableroId', as: 'listas' });
Lista.belongsTo(Tablero, { foreignKey: 'TableroId', as: 'tablero' });

Lista.hasMany(Tarjeta, { foreignKey: 'ListaId', as: 'tarjetas' });
Tarjeta.belongsTo(Lista, { foreignKey: 'ListaId', as: 'lista' });

module.exports = { Usuario, Tablero, Lista, Tarjeta };