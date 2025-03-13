const app = require('./app');


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