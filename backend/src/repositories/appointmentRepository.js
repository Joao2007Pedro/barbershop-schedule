const Appointment = require('../models/appointment');

const findAll = async () => {
  return Appointment.findAll();
};

const findById = async (id) => {
  return Appointment.findByPk(id);
};

const create = async (data) => {
  return Appointment.create(data);
};

const updateStatus = async (id, status) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return null;
  appointment.status = status;
  await appointment.save();
  return appointment;
};

const remove = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return false;
  await appointment.destroy();
  return true;
};

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  remove,
};
