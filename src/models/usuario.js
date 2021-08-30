const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, 'el nombre es obligatorio'],
    },
    correo: {
      type: String,
      required: [true, 'el correo es obligatorio'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'la contraseña es obligatoria'],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: [true, 'el rol es obligatorio'],
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model('Usuario', UsuarioSchema);
