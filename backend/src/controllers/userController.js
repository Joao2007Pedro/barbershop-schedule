const User = require('../models/user');
const userModel = require('../models/user');

// Função para obter todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para obter um usuário por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: [] }, 
        });
        if (!user) {
            return res.status(404).json({ error: 'User não encontrado' });
        }
        res.status(200).json(user); 
    } catch (error) {
        console.error('Erro ao obter usuário por id:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para atualizar um usuário existente
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User não encontrado' });
        }
        await User.update({ name, email, password }, { where: { id } });
        res.status(200).json({ message: 'User atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para remover um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User não encontrado' });
        }
        await User.destroy({ where: { id } });
        res.status(200).json({ message: 'User removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Exporta as funções do controlador de usuários
module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};