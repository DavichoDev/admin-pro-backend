
// ================================>
//   Controladores de los Hospitales
// ================================>

let { response } = require('express');

let Hospital = require('../models/hospital.model')

let getHospitales =  async(req, res = response) => {

    // .populate('usuario, 'nombre') => toma el id del usuario y nos retorna toda su información.
    let hospitales = await Hospital.find().populate('usuario', 'nombre');
    // A esta instrucción se le pueden agregar más campos .populate('usuario', 'nombre email') como el email.

    res.json({
        ok: true,
        hospitales
    });

}

let crearHospital = async(req, res = response) => {

    // UID tomado del token validarJWT() req => uid
    let uid = req.uid;

    let hospital = new Hospital({ 
        // ===> Se inicializa el usuario como el UID obtenido del token.
            usuario: uid,
        // ===>
        ...req.body 
    });

    try {

        let hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB, 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador.'
        });
    }



}

let actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });

}

let borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    });

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};

