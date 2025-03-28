const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const User = sequelize.define( "users",{
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
      defaultValue: "cliente",
    },
  },
  {
    timestamps: false, 
  }
);

module.exports = User;