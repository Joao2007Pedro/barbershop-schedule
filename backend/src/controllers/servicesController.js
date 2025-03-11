const servicesModel = require('../models/servicesModels');

const createService = async (req, res) => {
    const { name, description, price, duration, createdAt } = req.body;
    const service = { name, description, price, duration, createdAt: new Date(createdAt).toISOString().slice(0, 19).replace('T', ' ') };
    const result = await servicesModel.createService(service);
    res.status(201).json({ id: result.insertId });
};

module.exports = {
    createService,
};
