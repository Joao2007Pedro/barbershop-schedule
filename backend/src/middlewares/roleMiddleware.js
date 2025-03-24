const userModel = require('../models/user'); // Importe o modelo de usuário

const verificaAdm = async (req, res, next) => {
    const user = req.body.user; 

    if (!user) {
        return res.status(400).json({ message: 'Usuário não fornecido.' });
    }

    try {
        const userExists = await userModel.getUserById(user.id); 

        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (user.role === 'admin') {
            next(); 
        } else {
            res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    verificaAdm,
};