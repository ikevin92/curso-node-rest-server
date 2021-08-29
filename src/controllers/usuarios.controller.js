const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
  const {q, nombre, apikey} = req.query;
  res.json({
    msg: 'get api - controlador',
    q,
    nombre,
    apikey
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  // const body = req.body;
  res.json({
    msg: 'post api - controlador',
    nombre,
    edad,
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
