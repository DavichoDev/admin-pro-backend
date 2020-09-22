/* 
    Ruta: /api/login 
*/
let { Router } = require('express');
const { check } = require('express-validator');

let { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

let router = Router();

router.post('/',
    [
        check('email', 'El e-mail es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    login
);




module.exports = router;