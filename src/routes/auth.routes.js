const { Router } = require('express');
// middlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
//controladores
const { login, googleSignin } = require('../controllers/auth.controller');

// inicializacion router
const router = Router();

// rutas
router.post('/login',[
  check('correo', 'el correo es obligatorio').isEmail(),
  check('correo', 'la contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login );

// google auth
router.post(
  '/google',
  [
    check('id_token', 'el id token es necesario').not().isEmpty(),
    validarCampos,
  ],
  googleSignin,
);


module.exports = router;
