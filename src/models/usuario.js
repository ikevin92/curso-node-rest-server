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
      default: 'USER_ROLE',
      enum: {
        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} no es valida',
      },
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

// funcion para omitir campos como la contraseña en la respuesta
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  return {
    uid: _id,
    ...usuario,
  };
};

module.exports = model('Usuario', UsuarioSchema);
