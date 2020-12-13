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

// Filtro BD
ProductoSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, _id, ...object } = this.toObject();
    return object;

});

module.exports = model('Producto', ProductoSchema);
