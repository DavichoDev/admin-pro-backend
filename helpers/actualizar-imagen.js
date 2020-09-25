// File System, manipula archivos.
let fs = require('fs');

let Usuario = require('../models/usuario.model');
let Hospital = require('../models/hospital.model');
let Medico = require('../models/medico.model');

let borrarImagen = ( path ) => {

    if (fs.existsSync( path )) {
        // Se borra la imagen anterior.
        fs.unlinkSync( path );    
    }
} 

let actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch ( tipo ) {
        case 'medicos':
            let medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No se encontro médico por ID');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen( pathViejo );

            medico.img = nombreArchivo;

            await medico.save();
            return true;

        case 'hospitales':
            let hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No se encontro hospital por ID');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;

            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;

            await hospital.save();
            return true;

        case 'usuarios':
            let usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No se encontro usuario por ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;

            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
    }

}


module.exports = {
    actualizarImagen
}