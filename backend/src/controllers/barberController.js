const modelBarber = require('../models/barberModel/barberModel');

const getAllBarbers = async (req, res) => {
    try {
        const barbers = await modelBarber.getAllBarbers();
        res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBarbers,
};