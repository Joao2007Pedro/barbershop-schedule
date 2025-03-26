const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

const Appointment = sequelize.define('appointments', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id',
        },
    },
    barber_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'barbers',
        key: 'id',
        },
    },
    service_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model: 'services',
        key: 'id',
        },
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado'),
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

module.exports = Appointment;
