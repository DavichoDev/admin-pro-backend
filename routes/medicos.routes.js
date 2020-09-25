/* 
    Ruta: 'api/medicos'
*/

let { Router } = require('express');
let { check } =  require('express-validator');
let { validarCampos } = require('../middlewares/validar-campos');
let { getMedicos, crearMedico, actualizarMedico, borrarMedico } =  require('../controllers/medicos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

let router = Router();    

// ================================>
// INICIO GET medicos
// ================================>
router.get('/', getMedicos);
// ================================>
// FINAL GET medicos
// ================================>

// ================================>
// INICIO POST CREACIÓN de medicos
// ================================>
router.post('/', 
    [
        // Middlewares
        validarJWT,
        check('nombre', 'El es nombre obligatorio.').not().isEmpty(),
        check('hospital', 'El ID del hospital debe ser válido.').isMongoId(),
        validarCampos
    ],
    crearMedico
);
// ===============================>
// FINAL POST CREACIÓN de medicos
// ===============================>

// ====================================>
// INICIO PUT ACTUALIZACION de medicos
// ====================================> 
router.put('/:id', 
    [        
        // Middlewares 
        
    ],
    actualizarMedico
);
// =================================>
// FINAL PUT ACTUALIZACION de medicos
// ================================> 

// =====================================>
// INICIO DELETE ELIMINACIÓN de medicos
// =====================================> 
router.delete('/:id', borrarMedico);
// ====================================>
// FINAL DELETE ELIMINACIÓN de medicos
// ====================================> 

module.exports = router;