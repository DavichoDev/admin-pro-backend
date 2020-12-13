// Modelo de Usuario de Mongoose
let { Schema, model } = require('mongoose');

let PortafolioSchema = new Schema ({

    nombre: {
        type: String,
        required: true,
    },
    clase: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        // required: true
    }

});

// Se cambio el nombre de la propiedad _id => uid
// PortafolioSchema.method('toJSON', function() {
//     // Filtramos los datos retornados por la bd.
//     let { __v, _id, password, ...object } = this.toObject();
//     object.uid = _id;

//     return object;

// });

module.exports = model('Portafolio', PortafolioSchema);
