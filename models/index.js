const Usuario = require('./usuario');
const Tablero = require('./tablero');
const Lista = require('./lista');
const Tarjeta = require('./tarjeta');

Usuario.hasMany(Tablero);
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista);
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta);
Tarjeta.belongsTo(Lista);

module.exports = { Usuario, Tablero, Lista, Tarjeta };