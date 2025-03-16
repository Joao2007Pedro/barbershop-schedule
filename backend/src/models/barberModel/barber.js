const { DataTypes } = require("sequelize");
const sequelize = require('../../config/sequelize');

const Barber = sequelize.define( "barbers",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("cliente", "barbeiro", "admin"),
      defaultValue: "barbeiro",
    },
  },
  {
    timestamps: false, 
  }
);

module.exports = Barber;