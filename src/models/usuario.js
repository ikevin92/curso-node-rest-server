const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'el nombre es obligatori'],
  },
  correo: {
    type: String,
    require: [true, 'el correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'la contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Usuario', UsuarioSchema);
