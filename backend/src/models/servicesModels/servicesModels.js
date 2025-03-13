const connection = require('../../config/db');

const createService = async (service) => {
    const { name, description, price, duration, createdAt } = service;
    const query = 'INSERT INTO services (name, description, price, duration, created_at) VALUES (?, ?, ?, ?, ?)';
    try {
        const [result] = await connection.execute(query, [name, description, price, duration, createdAt]);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

const getAllServices = async () => {
    const query = 'SELECT * FROM services';
    try {
        const [services] = await connection.execute(query);
        return services;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

const getServiceById = async (id) => {
    const query = 'SELECT * FROM services WHERE id = ?';
    try {
        const [service] = await connection.execute(query, [id]);
        return service;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

const updateService = async (service, id) => {
    const { name, description, price, duration } = service;
    const query = 'UPDATE services SET name = ?, description = ?, price = ?, duration = ? WHERE id = ?';
    try {
        const [result] = await connection.execute(query, [name, description, price, duration, id]);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

const deleteService = async (id) => {
    const query = 'DELETE FROM services WHERE id = ?';
    try {
        const [result] = await connection.execute(query, [id]);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};