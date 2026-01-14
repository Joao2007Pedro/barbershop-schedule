// Repositório para gerenciar operações de banco de dados relacionadas a Appointment

// Importando o modelo Appointment para operações de banco de dados
const Appointment = require('../models/appointment');

// Função para buscar todos os agendamentos
const findAll = async () => {
  return Appointment.findAll();
};

// Função para buscar um agendamento por ID
const findById = async (id) => {
  return Appointment.findByPk(id);
};

// Função para criar um novo agendamento
const create = async (data) => {
  return Appointment.create(data);
};

// Função para atualizar o status de um agendamento
const updateStatus = async (id, status) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return null;
  appointment.status = status;
  await appointment.save();
  return appointment;
};

// Função para remover um agendamento
const remove = async (id) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) return false;
  await appointment.destroy();
  return true;
};

// Exporta as funções do repositório
module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  remove,
};
