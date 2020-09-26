
// ================================>
//   Controladores de los Auth
// ================================>

let { response } = require('express');
let bcrypt = require('bcryptjs'); 

let Usuario = require('../models/usuario.model');
let {generarJWT} = require('../helpers/jwt');
let { googleVerify } = require('../helpers/google-verify')

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

        // Generación de token
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


let googleSignIn = async (req, res = response) => {

    let googleToken = req.body.token;


    try {

        let { name, email, picture } = await googleVerify( googleToken );

        let usuarioDB = await Usuario.findOne({email});

        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en la Base de Datos
        await usuario.save();

        // Generar JWT
        let token = await generarJWT(usuario.id);

        res.json({
        ok: true,
        name,
        email,
        picture, 
        msg: 'Google Sign In',
        token
    });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'El Token no es correcto.'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}