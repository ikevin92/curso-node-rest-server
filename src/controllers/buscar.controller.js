const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

//models
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = ['usuarios', 'productos', 'categorias', 'roles'];

const buscarUsuarios = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  // expresion regular
  const regex = new RegExp(termino, 'i');

  // consulta condicional
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  // expresion regular
  const regex = new RegExp(termino, 'i');

  // consulta condicional
  const categorias = await Categoria.find({ estado: true, nombre: regex });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = '', res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      'categoria',
      'nombre',
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  // expresion regular
  const regex = new RegExp(termino, 'i');

  // consulta condicional
  const productos = await Producto.find({
    estado: true,
    nombre: regex,
  }).populate('categoria', 'nombre');

  res.json({
    results: productos,
  });
};

const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case 'usuarios':
      await buscarUsuarios(termino, res);
      break;
    case 'productos':
      await buscarProductos(termino, res);
      break;
    case 'categorias':
      await buscarCategorias(termino, res);

      break;

    default:
      res.status(500).json({
        msg: 'se me olvido hacer esta busqueda',
      });
      break;
  }
};

module.exports = {
  buscar,
};
