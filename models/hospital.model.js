// Modelo de Hospitales de Mongoose
let { Schema, model } = require('mongoose');

let HospitalSchema = new Schema ({

    nombre: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    usuario: {
        // Indica que habrá una relación con el Schema Usuario
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}/*
    En caso de querer nombrar la colección:
    ,
    { collection: 'hospitales' }
 */);

// Se cambio el nombre de la propiedad _id => uid
HospitalSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, ...object } = this.toObject();

    return object;

});

module.exports = model('Hospital', HospitalSchema);
