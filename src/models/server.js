const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // paths
    this.paths = {
      auth: '/api/auth',
      categorias: '/api/categorias',
      usuarios: '/api/usuarios',
    };

    //conectar a base de datos
    this.conectarDB();

    // middlewares
    this.middlewares();

    // rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Morgan
    this.app.use(morgan('dev'));
    // lectura y parseo del body
    this.app.use(express.json());
    // directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;
