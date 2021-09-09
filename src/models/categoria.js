const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, 'el nombre es obligatorio'],
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    // llave foranea
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// funcion para omitir campos
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return {
    ...data,
  };
};

module.exports = model('Categoria', CategoriaSchema);
