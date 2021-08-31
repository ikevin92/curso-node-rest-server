const { Router } = require('express');
// middlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
//controladores
const { login } = require('../controllers/auth.controller');

// inicializacion router
const router = Router();

// rutas
router.post('/login',[
  check('correo', 'el correo es obligatorio').isEmail(),
  check('correo', 'la contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login);

module.exports = router;
