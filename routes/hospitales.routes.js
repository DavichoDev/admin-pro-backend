/* 
    Ruta: '/api/hospitales'
*/
let { Router } = require('express');
let { check } =  require('express-validator');
let { validarCampos } = require('../middlewares/validar-campos');
let { getHospitales, crearHospital, actualizarHospital, borrarHospital } =  require('../controllers/hospitales.controller');
let { validarJWT } = require('../middlewares/validar-jwt');

let router = Router();    

// ==================================>
// INICIO GET hospitales
// ==================================>
router.get('/', validarJWT ,getHospitales);
// ==================================>
// FINAL GET hospitales
// ==================================>

// ==================================>
// INICIO POST CREACIÓN de hospitales
// ==================================>
router.post('/', 
    [
        // Middlewares
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);
// =================================>
// FINAL POST CREACIÓN de hospitales
// =================================>

// ======================================>
// INICIO PUT ACTUALIZACION de hospitales
// ======================================> 
router.put('/:id', 
    [        
        // Middlewares 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    actualizarHospital
);
// ===================================>
// FINAL PUT ACTUALIZACION de hospitales
// ==================================> 

// =======================================>
// INICIO DELETE ELIMINACIÓN de hospitales
// =======================================> 
router.delete('/:id', validarJWT ,borrarHospital);
// ======================================>
// FINAL DELETE ELIMINACIÓN de hospitales
// ======================================> 

module.exports = router;