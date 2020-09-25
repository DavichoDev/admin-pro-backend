/* 
    Ruta: api/todo/:busqueda
*/

let { Router } = require('express');
let { getBusqueda, getDocumentosColeccion } = require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

let router = Router();    

// ================================>
// INICIO GET busqueda
// ================================>
router.get('/:busqueda', validarJWT ,getBusqueda);
// ================================>
// FINAL GET busqueda
// ================================>

// ================================>
// INICIO GET Coleccion busqueda
// ================================>
router.get('/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion);
// ================================>
// FINAL GET Coleccion busqueda
// ================================>

module.exports = router;