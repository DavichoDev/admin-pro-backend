let { response } = require('express');
let bcrypt = require('bcryptjs'); 

// ================================>
//   Controladores de los Auth
// ================================>

let Usuario = require('../models/usuario.model')
let {generarJWT} = require('../helpers/jwt')

let login  = async (req, res = response ) => {

    // Entradas.
    let { email, password } = req.body; 

    try {

        // Demora de 1s {security}

        // Verificación de E-mail
        let usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valido.'
            });
        }

        // Verificación de contraseña
        let passValido = bcrypt.compareSync( password, usuarioDB.password ); 

        if (!passValido) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valido.'
            });
        }

        // Generar JWT
        let token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }
}


module.exports = {
    login
}