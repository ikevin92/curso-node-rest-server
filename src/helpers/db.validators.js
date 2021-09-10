const { Usuario, Categoria, Role, Producto } = require('../models');

const esRoleValido = async (rol = '') => {
  console.log(rol);
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta en la BD`);
  }
};

const emailExiste = async (correo = '') => {
  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(
      `El correo ${correo}, ya se encuentra registrado en la base de datos`,
    );
  }
};

const existeUsuarioPorId = async (id) => {
  //verificar si el usuario existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

/** 
 * Categorias
*/
const existeCategoriaPorId = async (id) => {
  //verificar si la categoria existe
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

const existeCategoriaPorNombre = async (nombre) => {
  //verificar si la categoria existe
  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) {
    throw new Error(`El nombre ${nombre} ya se encuentra en la BD`);
  }
};

/** 
 * Productos
*/
const existeProductoPorId = async (id) => {
  //verificar si la Producto existe
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

const existeProductoPorNombre = async (nombre) => {
  //verificar si la Producto existe
  const existeProducto = await Producto.findOne({ nombre });
  if (existeProducto) {
    throw new Error(`El nombre ${nombre} ya se encuentra en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeCategoriaPorNombre,
  existeProductoPorId,
  existeProductoPorNombre,
};
