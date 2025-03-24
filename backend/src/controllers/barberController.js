const Barber = require('../models/barber');
const User = require('../models/user');

const getAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.findAll();
        const users = await User.findAll();
        barbers.forEach(barber => {
            const user = users.find(user => user.id === barber.user_id);
            barber.dataValues.user = user;
        });
        res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBarberById = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await Barber.findByPk(id);
        const user = await User.findByPk(barber.user_id);
        barber.dataValues.user = user;
        if (!barber) {
            return res.status(404).json({ error: 'Barber not found' });
        }
        res.status(200).json(barber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBarber = async (req, res) => {
    const { user_id, bio } = req.body;
    try {
        // Verifica se o user_id foi fornecido
        if (!user_id) {
            return res.status(400).json({ message: "O campo 'user_id' é obrigatório." });
        }

        // Verifica se o usuário existe
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Verifica se o campo bio foi fornecido
        if (!bio || bio.trim() === "") {
            return res.status(400).json({ message: "O campo 'bio' é obrigatório." });
        }

        // Cria o barbeiro
        const barber = await Barber.create({ user_id, bio });

        // Atualiza o role do usuário, se necessário
        if (user.role !== 'barbeiro') {
            await user.update({ role: 'barbeiro' });
        }

        // Adiciona os dados do usuário ao barbeiro
        barber.dataValues.user = user;

        res.status(201).json(barber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBarbers,
    getBarberById,
    createBarber,
};