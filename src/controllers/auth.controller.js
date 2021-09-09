const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
// models
const Usuario = require('../models/usuario');
// helpers
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    console.log({ usuario });
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
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Algo salio mal hable con el administrador',
    });
  }
};

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    //funcion de google
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // crear el usuario sino existe
      const data = {
        correo,
        img,
        nombre,
        password: nombre,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // si el usuario en DB esta en false
    if (!usuario.estado) {
      res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    //general el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: 'todo ok google signin',
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Token de google no es valido',
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
