const { ValidationError } = require('../utils/errorHandler');

const isEmpty = (v) => v === undefined || v === null || String(v).trim() === '';

const validateCreate = (req, res, next) => {
  const { name, description, price, duration } = req.body;
  try {
    if (isEmpty(name)) throw new ValidationError("O campo 'name' é obrigatório.");
    if (isEmpty(description)) throw new ValidationError("O campo 'description' é obrigatório.");
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      throw new ValidationError('Preço inválido.');
    }
    if (duration === undefined || duration === null || isNaN(Number(duration)) || Number(duration) <= 0) {
      throw new ValidationError('Duração inválida.');
    }
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const validateUpdate = (req, res, next) => {
  const { name, description, price, duration } = req.body;
  try {
    if (isEmpty(name)) throw new ValidationError("O campo 'name' é obrigatório.");
    if (isEmpty(description)) throw new ValidationError("O campo 'description' é obrigatório.");
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
      throw new ValidationError('Preço inválido.');
    }
    if (duration === undefined || duration === null || isNaN(Number(duration)) || Number(duration) <= 0) {
      throw new ValidationError('Duração inválida.');
    }
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  validateCreate,
  validateUpdate,
};
