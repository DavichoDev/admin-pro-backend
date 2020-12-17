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
router.put('/:id',modificarDatos);
//Put
router.post('/',
    [
        check('generador', "Debes ingresar un digito 1 o 0 en la generador"),
        check('puerta', "Debes ingresar un digito 1 o 0 en la puerta"),
        check('patio', "Debes ingresar un digito 1 o 0 en la patio"),
        validarCampos
    ],
    enviarDatos
);


module.exports = router;