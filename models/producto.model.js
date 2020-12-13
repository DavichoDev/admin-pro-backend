// Modelo de Usuario de Mongoose
let { Schema, model } = require('mongoose');

let ProductoSchema = new Schema ({

    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        // require: true
    }
});

// Se cambio el nombre de la propiedad _id => uid
// ProductoSchema.method('toJSON', function() {
//     // Filtramos los datos retornados por la bd.
//     let { __v, _id, password, ...object } = this.toObject();
//     object.uid = _id;

//     return object;

// });

module.exports = model('Producto', ProductoSchema);
