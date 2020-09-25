/* 
    Ruta: /api/usuarios 
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } =  require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// ================================>
// INICIO GET usuarios
// ================================>
router.get('/', validarJWT, getUsuarios);
// ================================>
// FINAL GET usuarios
// ================================>

// ================================>
// INICIO POST CREACIÓN de usuarios
// ================================>
router.post('/', 
    [
        // Middlewares
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);
// ===============================>
// FINAL POST CREACIÓN de usuarios
// ===============================>

// ====================================>
// INICIO PUT ACTUALIZACION de usuarios
// ====================================> 
router.put('/:id', 
    [        
        // Middlewares 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);
// =================================>
// FINAL PUT ACTUALIZACION de usuarios
// ================================> 

// =====================================>
// INICIO DELETE ELIMINACIÓN de usuarios
// =====================================> 
router.delete('/:id', validarJWT, borrarUsuario);
// ====================================>
// FINAL DELETE ELIMINACIÓN de usuarios
// ====================================> 

module.exports = router;