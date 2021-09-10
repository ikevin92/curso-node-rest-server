const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Producto = require('../models/producto');

// obtener productos - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
  // argumentos opcionales
  const { limite = 5, desde = 0 } = req.query;
  // constante para pasar a las consultas
  const query = { estado: true };

  // query con el paginado recibiendo los parametros en queryparams
  // enviar ambas peticiones en una sola promesa
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

// obtener producto - populate {}
const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  res.json(producto);
};

// crear producto
const crearProducto = async (req = request, res = response) => {
  // se capitaliza en mayusculas
  const { estado, usuario, ...body } = req.body;

  const nombre = body.nombre;

  const productoDb = await Producto.findOne({
    nombre: nombre.toUpperCase(),
  });

  // validar que no existe
  if (productoDb) {
    return res.status(400).json({
      msg: `El producto ${productoDb.nombre}, ya existe`,
    });
  }

  // generar data al guardar
  const data = {
    ...body,
    descripcion: body.descripcion && body.descripcion.toUpperCase(),
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id, // viene del jwt
  };

  const producto = new Producto(data);
  // guardar en db
  await producto.save();

  return res.status(201).json(producto);
};

// actualizar categoria
const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

// Borrar categoria (cambiar el estado a false)
const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
  );

  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
