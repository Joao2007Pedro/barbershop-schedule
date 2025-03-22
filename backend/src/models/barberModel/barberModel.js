 const db = require('../../config/db');

const createBarber = async (name, email, password, role) => {
    const query = 'INSERT INTO barbers (, email, password, role) VALUES (?, ?, ?, ?)';
    const [barber] = await db.execute(query, [name, email, password, role]);
    return barber;
};


const getAllBarbers = async (req, res) => {
    const query = 'SELECT * FROM barbers';
    try {
        const [barbers] = await db.execute(query);
        return barbers;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBarbers, 
    createBarber,

};