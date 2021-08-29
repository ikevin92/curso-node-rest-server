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
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'getapi',
      });
    });

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'putapi',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'postapi',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'deleteapi',
      });
    } );
    
    this.app.patch('/api', (req, res) => {
      res.json({
        msg: 'patchapi',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;
