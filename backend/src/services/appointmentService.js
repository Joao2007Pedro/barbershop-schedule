// Serviço para gerenciar a lógica de negócios relacionada a agendamentos
const User = require('../models/user');
const Barber = require('../models/barber');
const Service = require('../models/service');
const AppointmentRepository = require('../repositories/appointmentRepository');
const { ValidationError, NotFoundError } = require('../utils/errorHandler');

// Status permitidos para um agendamento
const allowedStatus = ['pendente', 'confirmado', 'cancelado'];

// Função para enriquecer os dados do agendamento com informações relacionadas
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

// Função para obter agendamentos com filtros e paginação
const getAllAppointments = async (query = {}) => {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const pageSize = Number(query.pageSize) > 0 ? Number(query.pageSize) : 10;
  const offset = (page - 1) * pageSize;

  const where = {};
  if (query.status) where.status = query.status;
  if (query.user_id) where.user_id = Number(query.user_id);
  if (query.barber_id) where.barber_id = Number(query.barber_id);
  if (query.service_id) where.service_id = Number(query.service_id);

  // Filtro por intervalo de datas
  if (query.from || query.to) {
    where.appointment_date = {};
    if (query.from) where.appointment_date['$gte'] = new Date(query.from);
    if (query.to) where.appointment_date['$lte'] = new Date(query.to);
  }

  const { rows, count } = await AppointmentRepository.findAndCount({
    where,
    limit: pageSize,
    offset,
    order: [['appointment_date', 'ASC']],
  });

  return {
    items: rows,
    page,
    pageSize,
    total: count,
    totalPages: Math.ceil(count / pageSize),
  };
};

// Função para obter um agendamento por ID
const getAppointmentById = async (id) => {
  const appointment = await AppointmentRepository.findById(id);
  if (!appointment) throw new NotFoundError('Appointment not found');
  return enrichAppointment(appointment);
};

// Função para criar um novo agendamento
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

// Função para atualizar o status de um agendamento
const updateAppointmentStatus = async (id, status) => {
  if (!status) throw new ValidationError("O campo 'status' é obrigatório.");
  if (!allowedStatus.includes(status)) throw new ValidationError('Status inválido.');

  const updated = await AppointmentRepository.updateStatus(id, status);
  if (!updated) throw new NotFoundError('Appointment not found');
  return enrichAppointment(updated);
};

// Função para remover um agendamento
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
