// ================================>
//   Controladores de los Usuarios
// ================================>

let { response } = require('express');
let Usuario = require('../models/usuario.model');
let  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// Servicio para la obtención de usuarios.
let getUsuarios = async (req, res) => {

    let usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true, 
        usuarios: usuarios,
        // Este campo es parte del response modificado en el middleware
        uid: req.uid
    });

}

// Servicio para la creación de usuarios.
let crearUsuario = async (req, resp = response) => {

    let { email, password } = req.body;

    try {

        let existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return resp.status(400).json(
                {
                    ok: false,
                    msg: 'El correo ya esta registrado...'
                }
            );
        }

        let usuario = new Usuario( req.body );

        // Enctriptar contraseña
        let salt =  bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Generación de JWT
        let token = await generarJWT(usuario.id);

        // Guardar usuario
        await usuario.save();

        resp.json({
            ok: true, 
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json(
            {
                ok: false,
                msg: 'Error inesperado... revisar logs.'
            }
        );
    }




}

// Servicio para la actualización de usuario.
let actualizarUsuario = async (req, res = response) => {

    // ToDo_comment: Validar token y comprobar si es el usuario correcto.

    let uid = req.params.id;

    try {

        let usuarioDB = await Usuario.findById(uid);
        if ( !usuarioDB ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }

        // =============================>
        // INICIO - Validación de E-mail
        // =============================>

        // Se borran los campos que no necesito del objeto...
        let { password, google, email, ...campos }  = req.body;

        if ( usuarioDB.email !== email ) {
            // Buscando coindicencia con otro usuario con el mismo E-Mail
            let existeEmail = await Usuario.findOne( {email} );
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese E-mail'
                });
            }
        }

        campos.email = email;

        // ============================>
        // FINAL - Validación de E-mail
        // ============================>

        let usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        res.json({
            ok: true,
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
}

// Servico para el borrado de usuarios por {ID}. 
let borrarUsuario = async (req, res = response) => {

    uid = req.params.id;

    try {

        let usuarioDB = await Usuario.findById(uid);
        if ( !usuarioDB ) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente...'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Mensaje inesperado...'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
