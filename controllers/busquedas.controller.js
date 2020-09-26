// ================================>
//   Controladores de los Busqueda
// ================================>

let { response } = require('express');

let Usuario  = require('../models/usuario.model');
let Hospital = require('../models/hospital.model');
let Medico   = require('../models/medico.model');

// Servicio para la obtención de la busqueda.
let getBusqueda = async(req, res = response) => {

    let busqueda = req.params.busqueda;

    // Expresión regular insensible con el contenido de busqueda.
    let regEx = new RegExp(busqueda, 'i');

    let [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regEx }),
        Hospital.find({ nombre: regEx }),
        Medico.find({ nombre: regEx })
    ]);

    res.json({
        ok: true, 
        usuarios,
        hospitales,
        medicos
    });
}

// Servicio para la obtención de doctos por Colección.
let getDocumentosColeccion = async(req, res = response) => {

    let tabla    = req.params.tabla;
    let busqueda = req.params.busqueda;
    let regEx    = new RegExp(busqueda, 'i');

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find ({  nombre: regEx  })
                               .populate('hospital', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find ({  nombre: regEx  });
        break;

        case 'hospitales':            
            data = await Hospital.find ({  nombre: regEx  });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Las tablas deben ser usuarios/medicos/hospitales'
            });
    } 

    res.json({
        ok: true, 
        resultados: data
    });

}


module.exports = {
    getBusqueda,
    getDocumentosColeccion
}