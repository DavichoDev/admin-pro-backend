
let { response } = require('express');
let jwt = require('jsonwebtoken');
let Usuario = require('../models/usuario.model');

let validarJWT = ( req, res = response, next ) => {

    // Leer el token.
    let token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }    

    try {

        let { uid } = jwt.verify( token, process.env.JWT_SECRET );
        // El verify en caso de encontrar inconsistencia manda al CATCH

        // Se muestra/almacena el uid del usuario que hizo la petición
        /* En esta linea, como es un middleware utiliza también el objeto (req),
            este objeto también es utilizado por el controller consiguiente,
            por lo tanto cualquier petición CRUD tiene almacenado el UID de quien
            solicita, dicho UID esta almacenado en el JWT. 
        */
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}

let validarADMIN_ROLE = async ( req, res = response, next ) => {

    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

        if ( usuarioDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción.'
            });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Llame al administrador.'
        });
    }

};

let validarADMIN_ROLE_o_mismoUsuario = async ( req, res = response, next ) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

        if ( usuarioDB.role !== 'ADMIN_ROLE' && uid !== id) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción.'
            });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Llame al administrador.'
        });
    }

};

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUsuario,
}