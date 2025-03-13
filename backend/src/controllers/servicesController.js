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

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        console.error('Error getting services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error getting service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateService = async (req, res) => {
    const { name, description, price, duration } = req.body;
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        await service.update({ name, description, price, duration });
        res.status(200).json({menssage: 'Service updated'});
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        await service.destroy();
        res.status(204).json({menssage: 'Service deleted'});
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};