let jwt = require('jsonwebtoken');

let generarJWT = ( uid ) => {     

    return new Promise( (resolve, reject)=> {

        let payload = {
            uid
        };

        jwt.sign(
            payload,  
            process.env.JWT_SECRET,
            {expiresIn: '12h'},
            // Resolución o Rechazo de Promesa
            (err, token) =>{
                if ( err ) {
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve( token );
                }
            }

        );
    })
}

module.exports = {
    generarJWT,
}

