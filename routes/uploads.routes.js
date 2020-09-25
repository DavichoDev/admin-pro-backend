let { Router } = require('express');
let { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

let router = Router();  

let expressfileUpload = require('express-fileupload');

// Middleware
router.use( expressfileUpload() );

// ================================>
// INICIO PUT Subir Archivos
// ================================>
router.put('/:tipo/:idUsuario', fileUpload);
// ================================>
// FINAL PUT Subir Archivos
// ================================>

// ================================>
// INICIO Get Obtener Archivo
// ================================>
router.get('/:tipo/:imagen', retornaImagen);
// ================================>
// FINAL Get Obtener Archivo
// ================================>


module.exports = router;