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
        if (!user_id) {
            return res.status(400).json({ message: "O campo 'user_id' é obrigatório." });
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        if (!bio || bio.trim() === "") {
            return res.status(400).json({ message: "O campo 'bio' é obrigatório." });
        }
        const barber = await Barber.create({ user_id, bio });

        if (user.role !== 'barbeiro') {
            await user.update({ role: 'barbeiro' });
        }

        barber.dataValues.user = user;

        res.status(201).json(barber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBarber = async (req, res) => {
    const { id } = req.params;
    const { bio } = req.body;
    try {
        const barber = await Barber.findByPk(id);
        if (!barber) {
            return res.status(404).json({ error: 'Barber not found' });
        }
        if (!bio || bio.trim() === "") {
            return res.status(400).json({ message: "O campo 'bio' é obrigatório." });
        }
        await barber.update({ bio });
        res.status(200).json(barber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBarber = async (req, res) => {
    const { id } = req.params;
    try {
        const barber = await Barber.findByPk(id);
        let user = await User.findByPk(barber.user_id);
        if (user.role === 'barbeiro') {
            const barbers = await Barber.findAll();
            const otherBarber = barbers.find(barber => barber.user_id !== user.id);
            if (!otherBarber) {
                await user.update({ role: 'cliente' });
            }
        }
        if (!barber) {
            return res.status(404).json({ error: 'Barber not found' });
        }
        await barber.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBarbers,
    getBarberById,
    createBarber,
    updateBarber,
    deleteBarber
};