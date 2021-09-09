const { Router } = require('express');
// middlewares
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
//controladores
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias.controller');
// helpers
const {
  existeCategoriaPorId,
  existeCategoriaPorNombre,
} = require('../helpers/db.validators');
// inicializacion router
const router = Router();

// rutas
// obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria,
);

// crear categoria -privado - con cualquier token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria,
);

// actualizar categoria - privado - con cualquier token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaPorNombre),
    validarCampos,
  ],
  actualizarCategoria,
);

// eliminar o borrar una categoria - admin - con cualquier token valido
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria,
);
module.exports = router;
