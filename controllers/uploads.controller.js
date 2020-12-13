// ================================>
//   Controladores de las Uploads
// ================================>

let { response } = require("express");
let { v4: uuidv4 } = require('uuid');
let path = require( 'path' );
let cloudinary = require('cloudinary');
let Producto =  require("../models/producto.model");
let Portafolio =  require("../models/portafolio.model");

// File System
let fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
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
let subirPortafolio = async (req, res = response) => {

    let {nombre, clase} = req.body;
    let fileImg = req.files;

    let tiposValidos = ['residencial', 'oficina', 'comercial'];

    try {

        // Validar que existe un archivo
        if ( !tiposValidos.includes( clase ) ) {
            return res.status(400).json({
                ok: false,
                msg: 'No de clase: residencial, oficina o comercial'
            });
        }

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

        // Mover la imagen de manera local, para obtener una rutra temporal.
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

        // Remover la imagen del servidor.
        fs.unlink( path, (error) => {
            if(error){
                return resp.status(500).json({
                ok: false,
                msg: "Error interno del servidor."
                });    
            }
        });

        // Creacion del modelo Producto.
        let portafolio = new Portafolio({nombre, clase, img});
        // Guardamos en la base de datos.
        await portafolio.save();

            res.json({
                ok: true,
                portafolio
            });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
        ok: false,
        msg: "Error inesperado... revisar logs.",
    });
    }
};

let subirProducto = async (req, res = response) => {

    let {nombre, precio} = req.body;
    let fileImg = req.files;

    try {

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

    // Mover la imagen de manera local, para obtener una rutra temporal.
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

    // Remover la imagen del servidor.
    fs.unlink( path, (error) => {
        if(error){
            return resp.status(500).json({
            ok: false,
            msg: "Error interno del servidor."
            });    
        }
    });

    // Creacion del modelo Producto.
    let producto = new Producto({nombre, precio, img});
    // Guardamos en la base de datos.
    await producto.save();

        res.json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
        ok: false,
        msg: "Error inesperado... revisar logs.",
    });
    }

};

// GET
let getPortafolio = async (req, res = response) => {

    try {
        // Se utiliza para ejecutar las promesas de manera simultanea.
        let [portafolios, totalRegistros] = await Promise.all([
            // Find con paginación
            Portafolio.find({}, "nombre clase img").limit(12),
            // ^^^ .skip( Number ) se salta los registros desde el número señalado.
            // ^^^ .limit( Number ) establece un limite de registros a encontrar.
            Portafolio.countDocuments(),
        ]);
        // Es una colección de promesas.

        res.json({
            ok: true,
            portafolios,
            totalRegistros 
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
        ok: false,
        msg: "Error interno del servidor.",
        });
    }
};

let getProducto = async(req, res = response) => {
    try {
        // Se utiliza para ejecutar las promesas de manera simultanea.
        let [productos, totalRegistros] = await Promise.all([
            // Find con paginación
            Producto.find({}, "nombre precio img").limit(6),
            // ^^^ .skip( Number ) se salta los registros desde el número señalado.
            // ^^^ .limit( Number ) establece un limite de registros a encontrar.
            Producto.countDocuments(),
        ]);
        // Es una colección de promesas.

        res.json({
            ok: true,
            productos,
            totalRegistros 
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
        ok: false,
        msg: "Error interno del servidor.",
        });
    }
};

module.exports = {
    fileUpload,
    retornaImagen,
    subirPortafolio,
    subirProducto,
    getPortafolio,
    getProducto
}