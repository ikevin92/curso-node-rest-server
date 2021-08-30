const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: 'get api - controlador',
    q,
    nombre,
    apikey,
  });
};

const usuariosPost = async ( req = request, res = response ) => {  

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra registrado en la base de datos`,
    });
  }

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en bd
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch api - controlador',
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'put api - controlador',
    id,
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: 'get api - controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
