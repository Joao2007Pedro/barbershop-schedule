const { handleErrorResponse } = require('../utils/errorHandler');

// Middleware global de tratamento de erros
// Deve ser registrado após as rotas no app
module.exports = (err, req, res, next) => {
  // Se já foi enviado, apenas passa adiante
  if (res.headersSent) {
    return next(err);
  }
  return handleErrorResponse(res, err);
};
