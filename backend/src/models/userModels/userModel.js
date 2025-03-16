const db = require('../../config/db'); 

const getAllUsers = async () => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const [result] = await db.execute('SELECT * FROM users WHERE id = 1', [id]); 
        return result;
    } catch (error) {
        throw new Error('Erro ao buscar usuário: ' + error.message);
    }
};

const updateUser = async (id, name, email, password) => {
    try {
        const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
        const values = [name, email, password, id];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};


module.exports = {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};