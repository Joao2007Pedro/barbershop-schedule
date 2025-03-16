 const db = require('../../config/db');

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

};