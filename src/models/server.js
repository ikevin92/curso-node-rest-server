const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    // directiorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello World');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;
