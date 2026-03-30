const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarjeta = sequelize.define('Tarjeta', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#4f6ef7',
  },
});

module.exports = Tarjeta;