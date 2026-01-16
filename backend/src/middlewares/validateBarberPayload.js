const { ValidationError } = require('../utils/errorHandler');

const isEmpty = (v) => v === undefined || v === null || String(v).trim() === '';
const isPositiveInt = (v) => Number.isInteger(Number(v)) && Number(v) > 0;

const validateCreate = (req, res, next) => {
  const { user_id, bio } = req.body;
  try {
    if (!isPositiveInt(user_id)) throw new ValidationError("O campo 'user_id' é obrigatório e deve ser um inteiro positivo.");
    if (isEmpty(bio)) throw new ValidationError("O campo 'bio' é obrigatório.");
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const validateUpdate = (req, res, next) => {
  const { bio } = req.body;
  try {
    if (isEmpty(bio)) throw new ValidationError("O campo 'bio' é obrigatório.");
    next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  validateCreate,
  validateUpdate,
};
