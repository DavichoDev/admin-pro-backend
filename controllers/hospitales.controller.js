
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

let actualizarHospital = async (req, res = response) => {

    let idHospital = req.params.id;
    // ID del usuario que realizo la actualización.
    let uid = req.uid;

    try {

        let hospitalDB = await Hospital.findById(idHospital);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }

        console.log(hospitalDB);

        let cambiosHospital = {
            ...req.body,
            // ID del usuario que hace la modificacion
            usuario: uid
        };

        // '{ new: true }' devuelve el registro ya actualizado.
        let hospitalActualizado = await Hospital.findByIdAndUpdate(idHospital, cambiosHospital, { new: true });   

        res.json({
            ok: true,
            hospital: hospitalActualizado,
            msg: 'actualizarHospital',
        });
    
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

}

// TODO: Checar esta función.
let borrarHospital = async (req, res = response) => {

    let idHospital = req.params.id;

    try {

        let hospitalBD = await Hospital.findById(idHospital);
    
        console.log(hospitalBD);

        if ( !hospitalBD ) {
            return res.status(404).status({
                ok: false,
                msg: 'No existe ningún hospital con ese ID.'
            });
        }

        await Hospital.findByIdAndDelete(idHospital);

        res.json({
            ok: true,
            msg: 'Hospital eliminado.'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Contacte con el administrador.'
        })
    }

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};  

