const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  // argumentos opcionales
  const { limite = 5, desde = 0 } = req.query;
  // constante para pasar a las consultas
  const query = { estado: true };

  // query con el paginado recibiendo los parametros en queryparams
  // enviar ambas peticiones en una sola promesa
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en bd
  await usuario.save();

  res.json(usuario);
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch api - controlador',
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  // extraemos lo que no vamos actualizar
  const { password, google, _id, correo, ...resto } = req.body;
  
  // validando match de la contraseña en la bd
  if (password) {
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
  }

  //
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  // cambiar estado de usuario
  const usuario = await Usuario.findOneAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
