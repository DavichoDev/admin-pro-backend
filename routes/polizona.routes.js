/* 
    Ruta: 'api/polizona'
*/

let { Router } = require("express");
let { check } = require("express-validator");
let { enviarJson } = require("../controllers/polizona.controller");

const router = Router();

// ================================>
// INICIO POST CREACIÓN de usuarios
// ================================>
router.get('/', 
    [
        // Middlewares
    ],
    enviarJson
);
// ===============================>
// FINAL POST CREACIÓN de usuarios
// ===============================>

module.exports = router;