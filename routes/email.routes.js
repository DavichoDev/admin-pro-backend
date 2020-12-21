let { Router } = require('express');
let { enviarEmail, postEmail  } = require('../controllers/email.controller');
let router = Router();  

const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Post Email
router.post('/', postEmail);

module.exports = router;