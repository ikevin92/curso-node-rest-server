const { Router } = require('express');
const Role = require('../models/role');
// middlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
// controladores
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require('../controllers/usuarios.controller');

// inicializacion router
const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post(
  '/',
  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe contener minimo 6 caracteres').isLength(
      { min: 6 },
    ),
    check('correo', 'el correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async (rol = '') => {
      const exiteRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no esta en la base de datos`);
      }
    }),
    validarCampos,
  ],
  usuariosPost,
);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;
