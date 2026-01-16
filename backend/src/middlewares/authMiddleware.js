const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware de autenticação para proteger rotas
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  // Verifica se o token está presente
  if (!token) {
    return res.status(401).json({ message: "Acesso negado! Token não fornecido." });
  }
  // Verifica e decodifica o token
  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified; 
    next();
  // Se o token for inválido, retorna erro
  } catch (error) {
    res.status(401).json({ message: "Token inválido!" });
  }
};

// Exporta o middleware de autenticação
module.exports = authMiddleware;
