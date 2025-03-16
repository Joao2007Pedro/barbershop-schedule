const userModel = require('../models/userModels/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await userModel.updateUser(id, name, email, password);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User updated successfully' });
        }
        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.deleteUser(id);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User deleted successfully' });
        }
        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};