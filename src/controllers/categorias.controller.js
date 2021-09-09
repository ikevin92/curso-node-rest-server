const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Categoria = require('../models/categoria');

// obtener categorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  // argumentos opcionales
  const { limite = 5, desde = 0 } = req.query;
  // constante para pasar a las consultas
  const query = { estado: true };

  // query con el paginado recibiendo los parametros en queryparams
  // enviar ambas peticiones en una sola promesa
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtener categoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.json(categoria);
};

// crear categoria
const crearCategoria = async (req = request, res = response) => {
  // se capitaliza en mayusculas
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDb = await Categoria.findOne({ nombre });

  // validar que no existe
  if (categoriaDb) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDb.nombre}, ya existe`,
    });
  }

  // generar data al guardar
  const data = {
    nombre,
    usuario: req.usuario._id, // viene del jwt
  };

  const categoria = new Categoria(data);
  // guardar en db
  categoria.save();

  return res.status(201).json(categoria);
};

// actualizar categoria
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

// Borrar categoria (cambiar el estado a false)
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
  );

  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
