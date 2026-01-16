const User = require('../models/user');

// Middleware para verificar se o usuário é administrador
const verificaAdm = async (req, res, next) => {
    const tokenUser = req.user;
    // Um if para garantir que o usuário autenticado exista
    if (!tokenUser) {
        return res.status(401).json({ message: 'Acesso negado! Usuário não autenticado.' });
    }
    // Verifica se o usuário é administrador
    try {
        const userExists = await User.findByPk(tokenUser.id);
        // Se o usuário não existir, retorna erro
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        // Se o cargo do usuário for 'admin', permite o acesso
        if (tokenUser.role === 'admin') {
            return next();
        }
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    // Se ocorrer algum erro durante o processo, retorna erro interno do servidor
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    verificaAdm,
};