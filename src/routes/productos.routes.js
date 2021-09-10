const { Router } = require('express');
// middlewares
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
//controladores
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos.controller');
// helpers
const {
  existeCategoriaPorId,
  existeProductoPorId,
  existeProductoPorNombre,
} = require('../helpers/db.validators');

// inicializacion router
const router = Router();

// rutas
// obtener todas las Productos - publico
router.get('/', obtenerProductos);

// obtener una Producto por id - publico
router.get(
  '/:id',
  [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto,
);

// crear Producto -privado - con cualquier token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'la categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto,
);

// actualizar Producto - privado - con cualquier token valido
router.put(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    // check('categoria', 'la categoria es obligatoria').not().isEmpty(),
    // check('categoria').custom(existeCategoriaPorId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeProductoPorNombre),
    validarCampos,
  ],
  actualizarProducto,
);

// eliminar o borrar una Producto - admin - con cualquier token valido
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto,
);

module.exports = router;
