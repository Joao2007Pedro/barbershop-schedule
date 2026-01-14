// Estrutura de dados para a classe Service usando Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Service = sequelize.define('barbearia', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'services',
  timestamps: false,
});

module.exports = Service;