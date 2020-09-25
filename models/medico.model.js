// Modelo de Medicos de Mongoose
let { Schema, model } = require('mongoose');

let MedicoSchema = new Schema ({

    nombre: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    hospital: {
        // Indica que habrá una relación con el Schema Usuario
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    usuario: {
        // Indica que habrá una relación con el Schema Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}/*
    En caso de querer nombrar la colección:
    ,
    { collection: 'hospitales' }
 */);

// Se cambio el nombre de la propiedad _id => uid
MedicoSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, ...object } = this.toObject();

    return object;

});

module.exports = model('Medico', MedicoSchema);
