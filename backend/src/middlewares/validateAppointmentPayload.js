const { ValidationError } = require('../utils/errorHandler');
const isEmpty = (v) => v === undefined || v === null || String(v).trim() === '';
const isPositiveInt = (v) => Number.isInteger(Number(v)) && Number(v) > 0;
const allowedStatus = ['pendente', 'confirmado', 'cancelado'];

// Validação específica para criação de agendamento
const validateCreate = (req, res, next) => {
  const { user_id, barber_id, service_id, appointment_date, status } = req.body;
  try {
    if (!isPositiveInt(user_id)) throw new ValidationError("O campo 'user_id' é obrigatório e deve ser um inteiro positivo.");
    if (!isPositiveInt(barber_id)) throw new ValidationError("O campo 'barber_id' é obrigatório e deve ser um inteiro positivo.");
    if (!isPositiveInt(service_id)) throw new ValidationError("O campo 'service_id' é obrigatório e deve ser um inteiro positivo.");
    if (isEmpty(appointment_date)) throw new ValidationError("O campo 'appointment_date' é obrigatório.");
    if (!allowedStatus.includes(String(status))) throw new ValidationError('Status inválido.');
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

// Validação específica para atualização de status
const validateUpdateStatus = (req, res, next) => {
  const { status } = req.body;
  try {
    if (!allowedStatus.includes(String(status))) throw new ValidationError('Status inválido.');
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  validateCreate,
  validateUpdateStatus,
};
