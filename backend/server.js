const app = require('./app');


const startServer = async () => {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Server rodando na porta ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Erro na conexão:', error);
  }
};

startServer();