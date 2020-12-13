// ================================>
//   Controladores de las Uploads
// ================================>

let { response } = require("express");
let { v4: uuidv4 } = require('uuid');
let path = require( 'path' );
let cloudinary = require('cloudinary');

// File System
let fs = require('fs');

cloudinary.config({ 
    cloud_name: 'davicho', 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET 
});

let { actualizarImagen } = require('../helpers/actualizar-imagen');

let fileUpload = (req, res = response) => {

    // Extracción de parametros
    let tipo      = req.params.tipo;
    let idUsuario = req.params.idUsuario;
    // Procesar la imagen. Se obtiene la imagen de los parametros.
    let file      = req.files.imagen;
    // ^^^ en se tiene acceso a .files gracias al middleware.

    let tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    // Validar que existe un archivo
    if ( !tiposValidos.includes( tipo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medicos, usuarios u hospital'
        });
    }

    // Si el request file no esta cargado se manda el error.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Obtener extensión
    let nombreCortado = file.name.split('.'); // icono. ==> png <===
    let extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // Validar extensión
    let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida.'
        });
    }

    // Generar nombre del archivo.
    let nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
    //Ruta para guardar la imagen.
    let path = `./uploads/${ tipo }/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, ( err ) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen.'
            });
        }
        
    // Actualizar base de datos
    actualizarImagen(tipo, idUsuario, nombreArchivo);

    res.json({
        ok: true,
        msg: 'Archivo subido.',
        nombreArchivo
    });        

    });

}

let retornaImagen = (req, res = response) => {

    let tipo = req.params.tipo;
    let imagen = req.params.imagen;

    let pathImg = path.join( __dirname, `../uploads/${ tipo }/${ imagen }` );

    // Imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}

// CustomWoods

// POST
let subirPortafolio = (req, res = response) => {
    
}

let subirProducto = async(req, res = response) => {

    let {nombre, precio} = req.body;
    let fileImg = req.files;

    console.log('img: ',fileImg);

    //Validacion de IMG
    if( !fileImg || fileImg === null ){
        return res.status(500).json({
            ok: false,
            msg: "Falta cargar la imagen.",    
        });
    } else {
        fileImg = req.files.img;
    }

    // Obtener extensión
    let nombreCortado = fileImg.name.split('.'); // icono. ==> png <===
    let extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // Validar extensión
    let extensionesValidas = ['png', 'jpg', 'jpeg'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida (.png, .jpg, .jpeg).'
        });
    }

    // Generar nombre del archivo.
    let nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
    //Ruta para guardar la imagen.
    let path = `./uploads/${nombreArchivo}`;

    // Mover la imagen de manera local
    fileImg.mv(path, ( err ) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen.'
            });
        }
    });

    let img = '';

    // Obtener URL de Cloudinary
    await cloudinary.v2.uploader.upload(path, (error, result) => {
        img = result.url;
    });

    try {
        res.json({
            ok: true,
            nombre,
            precio,
            img
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
        ok: false,
        msg: "Error inesperado... revisar logs.",
    });
    }

}

// GET
let getPortafolio = (req, res = response) => {

}

let getProducto = (req, res = response) => {

}

module.exports = {
    fileUpload,
    retornaImagen,
    subirPortafolio,
    subirProducto,
    getPortafolio,
    getProducto
}