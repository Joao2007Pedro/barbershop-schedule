const User = require('../models/user');

const verificaAdm = async (req, res, next) => {
    // Requer uso prévio de authMiddleware para popular req.user
    const tokenUser = req.user;

    if (!tokenUser) {
        return res.status(401).json({ message: 'Acesso negado! Usuário não autenticado.' });
    }

    try {
        const userExists = await User.findByPk(tokenUser.id);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (tokenUser.role === 'admin') {
            return next();
        }
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    verificaAdm,
};