const { Router } = require('express');
// middlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
// helpers
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db.validators');
// controladores
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

// inicializacion router
const router = Router();

// rutas
router.get('/', usuariosGet);
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut,
);
router.post(
  '/',
  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe contener minimo 6 caracteres').isLength(
      { min: 6 },
    ),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
    // check('correo', 'el correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  ],
  usuariosPost,
);
router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete,
);
router.patch(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosPatch,
);

module.exports = router;
