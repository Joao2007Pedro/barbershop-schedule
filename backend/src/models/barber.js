const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ajuste para o caminho correto do seu arquivo de configuração do Sequelize

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