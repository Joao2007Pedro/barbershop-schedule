const Service = require('../models/servicesModels/service');

const createService = async (req, res) => {
    const { name, description, price, duration, createdAt } = req.body;
    try {
        const service = await Service.create({ name, description, price, duration, createdAt });
        res.status(201).json({ id: service.id });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createService,
};