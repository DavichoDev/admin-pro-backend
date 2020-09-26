
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

module.exports = {
    validarJWT,
}