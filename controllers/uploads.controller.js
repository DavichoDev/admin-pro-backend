// ================================>
//   Controladores de las Uploads
// ================================>

let { response } = require("express");
let { v4: uuidv4 } = require('uuid');
let path = require( 'path' );
// File System
let fs = require('fs');

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
        console.log('Retorna: ', pathImg);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}