
// ================================>
//   Controladores de los Medicos
// ================================>

let { response } = require('express');
let Medico = require('../models/medico.model');

let getMedicos = async(req, res = response) => {

    let medicos = await Medico.find().populate('hospital', 'nombre img')
                               .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        medicos
    });

}

let crearMedico = async (req, res = response) => {

    // UID tomado del token validarJWT() req => uid
    let uid = req.uid;

    let medico = new Medico( {
        usuario: uid,
        ...req.body
    });

    try {

        let medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Favor de contactarse con el administrador. CrearMedico'
        })
    }

}

let actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });

}

let borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    });

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};

