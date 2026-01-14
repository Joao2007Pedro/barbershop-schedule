// Estrutura de dados para a classe Barber usando Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Barber = sequelize.define('barbers', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

module.exports = Barber;