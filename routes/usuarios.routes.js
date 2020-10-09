/* 
    Ruta: /api/usuarios 
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } =  require('../controllers/usuarios.controller');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();


// ================================>
// INICIO GET usuarios
// ================================>
router.get('/', [validarJWT, validarADMIN_ROLE], getUsuarios);
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
        validarADMIN_ROLE_o_mismoUsuario,
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
router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);
// ====================================>
// FINAL DELETE ELIMINACIÓN de usuarios
// ====================================> 

module.exports = router;