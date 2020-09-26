/* 
    Ruta: /api/login 
*/
// Importaciones
let { Router } = require('express');
const { check } = require('express-validator');

// Controller
let { login, googleSignIn } = require('../controllers/auth.controller');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


let router = Router();

// Orden de estructuración de rutas: ('path', ['middlewares'], controller).

router.post('/login',
    [
        // Middlewares para validar 'Entradas'.
        check('email', 'El e-mail es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/login/google',
    [
        // Middlewares para validar 'Entradas'.
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);


module.exports = router;