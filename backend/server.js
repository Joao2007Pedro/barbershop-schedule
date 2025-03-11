const app = require('./app');
require('./src/config/syncDatabase'); // Importa e executa a sincronização do banco de dados

const startServer = async () => {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Server running on port ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();