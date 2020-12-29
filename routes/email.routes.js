let { Router } = require('express');
let { postEmail, postEmailMsg  } = require('../controllers/email.controller');
let router = Router();  

const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Post Email
router.post('/', postEmail);

// Post Email Msg
router.post('/msg', postEmailMsg);

module.exports = router;