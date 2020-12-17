/* 
    Ruta: api/todo/:busqueda
*/
let { Router } = require('express');
let { check } = require("express-validator");
let { validarCampos } = require("../middlewares/validar-campos");
let { enviarDatos, obtenerDatos, modificarDatos } = require("../controllers/arduino.contoller")

let router = Router();    

//Get
router.get('/:id', obtenerDatos);
//Post
router.put('/:id',
    [
        check('sala', "Debes ingresar un digito 1 o 0 en la sala"),
        check('puerta', "Debes ingresar un digito 1 o 0 en la puerta"),
        check('patio', "Debes ingresar un digito 1 o 0 en la patio"),
        validarCampos
    ],
    modificarDatos
);
//Put
router.post('/',
    [
        check('sala', "Debes ingresar un digito 1 o 0 en la sala"),
        check('puerta', "Debes ingresar un digito 1 o 0 en la puerta"),
        check('patio', "Debes ingresar un digito 1 o 0 en la patio"),
        validarCampos
    ],
    enviarDatos
);


module.exports = router;