let { Router } = require('express');
let { fileUpload, retornaImagen, subirPortafolio, 
    subirProducto, subirImg, getPortafolio, 
    getProducto  } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

let router = Router();  

let expressfileUpload = require('express-fileupload');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

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


// CustomWoods
// Post Portafolio
router.post('/portafolio', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('clase', 'El nombre es obligatorio').not().isEmpty(),
        // check('img', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    subirPortafolio
);
// Post Productos
router.post('/productos', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El nombre es obligatorio').not().isEmpty(),
        // check('img', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos        
    ],
    subirProducto
);

// Post Productos
router.post('/img', subirImg);

//Get Portafolio
router.get('/portafolio', getPortafolio);
//Get Productos
router.get('/productos', getProducto);


module.exports = router;