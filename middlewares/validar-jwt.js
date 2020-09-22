
let { response } = require('express');
let jwt = require('jsonwebtoken');

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
        // El verifi en caso de encontrar inconsistencia manda al CATCH

        // Se muestra/almacena el uid del usuario que hizo la petición
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
}

module.exports = {
    validarJWT,
}