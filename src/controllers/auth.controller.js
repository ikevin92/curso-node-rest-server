const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require( '../helpers/generar-jwt' );

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    console.log(usuario)
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario/Password no son validos - correo',
      });
    }

    //verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - estado: false',
      });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario/Password no son correctos - password',
      });
    }

    //general el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Algo salio mal hable con el administrador',
    });
  }
};

module.exports = {
  login,
};
