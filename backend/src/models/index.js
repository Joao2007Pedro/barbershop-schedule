const sequelize = require('../config/sequelize');
const User = require('./user');
const Barber = require('./barber');
const Service = require('./service');
const Appointment = require('./appointment');

// Associações
// Um usuário pode ter muitos agendamentos
User.hasMany(Appointment, { foreignKey: 'user_id' });
Appointment.belongsTo(User, { foreignKey: 'user_id' });

// Um barbeiro (perfil vinculado a um usuário) pode ter muitos agendamentos
Barber.hasMany(Appointment, { foreignKey: 'barber_id' });
Appointment.belongsTo(Barber, { foreignKey: 'barber_id' });

// Um serviço pode estar em muitos agendamentos
Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

// Um barbeiro pertence a um usuário (vínculo de perfil)
Barber.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Barber, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Barber,
  Service,
  Appointment,
};
