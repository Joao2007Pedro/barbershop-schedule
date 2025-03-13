const db = require('../../config/db'); 

const getUserById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]); 
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao buscar usuário: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users'); 
        return result.rows;
    } catch (error) {
        throw new Error('Erro ao buscar usuários: ' + error.message);
    }
};

module.exports = {
    getUserById,
    getAllUsers,
};