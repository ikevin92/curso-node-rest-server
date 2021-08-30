const { Schema, model } = require('mongoose');

const RoleSchema = Schema(
  {
    rol: {
      type: String,
      required: [true, 'el rol es obligatorio'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model('Role', RoleSchema);
