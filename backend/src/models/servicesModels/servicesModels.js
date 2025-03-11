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

module.exports = {
    createService,
};