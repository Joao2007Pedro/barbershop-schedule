const sequelize = require('./sequelize');

const syncDatabase = async () => {
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();