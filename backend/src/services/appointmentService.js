const User = require('../models/user');
const Barber = require('../models/barber');
const Service = require('../models/service');
const AppointmentRepository = require('../repositories/appointmentRepository');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');

const allowedStatus = ['pendente', 'confirmado', 'cancelado'];

const enrichAppointment = async (appointment) => {
  if (!appointment) return null;
  const user = await User.findByPk(appointment.user_id);
  const barber = await Barber.findByPk(appointment.barber_id);
  const service = await Service.findByPk(appointment.service_id);
  appointment.dataValues.user = user || null;
  appointment.dataValues.barber = barber || null;
  appointment.dataValues.service = service || null;
  return appointment;
};

const getAllAppointments = async () => {
  const appointments = await AppointmentRepository.findAll();
  // Enriquecer em paralelo para melhor desempenho
  const enriched = await Promise.all(appointments.map(enrichAppointment));
  return enriched;
};

const getAppointmentById = async (id) => {
  const appointment = await AppointmentRepository.findById(id);
  if (!appointment) throw new NotFoundError('Appointment not found');
  return enrichAppointment(appointment);
};

const createAppointment = async (payload) => {
  const { user_id, barber_id, service_id, appointment_date, status } = payload;

  if (!user_id) throw new ValidationError("O campo 'user_id' é obrigatório.");
  if (!barber_id) throw new ValidationError("O campo 'barber_id' é obrigatório.");
  if (!service_id) throw new ValidationError("O campo 'service_id' é obrigatório.");
  if (!appointment_date) throw new ValidationError("O campo 'appointment_date' é obrigatório.");
  if (!status) throw new ValidationError("O campo 'status' é obrigatório.");
  if (!allowedStatus.includes(status)) throw new ValidationError('Status inválido.');

  const user = await User.findByPk(user_id);
  if (!user) throw new NotFoundError('Usuário não encontrado.');

  const barber = await Barber.findByPk(barber_id);
  if (!barber) throw new NotFoundError('Barbeiro não encontrado.');

  const service = await Service.findByPk(service_id);
  if (!service) throw new NotFoundError('Serviço não encontrado.');

  const appointment = await AppointmentRepository.create({
    user_id,
    barber_id,
    service_id,
    appointment_date,
    status,
  });

  appointment.dataValues.user = user;
  appointment.dataValues.barber = barber;
  appointment.dataValues.service = service;
  return appointment;
};

const updateAppointmentStatus = async (id, status) => {
  if (!status) throw new ValidationError("O campo 'status' é obrigatório.");
  if (!allowedStatus.includes(status)) throw new ValidationError('Status inválido.');

  const updated = await AppointmentRepository.updateStatus(id, status);
  if (!updated) throw new NotFoundError('Appointment not found');
  return enrichAppointment(updated);
};

const deleteAppointment = async (id) => {
  const ok = await AppointmentRepository.remove(id);
  if (!ok) throw new NotFoundError('Appointment not found');
  return true;
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
