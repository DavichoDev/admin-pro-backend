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

// Filtro BD
PortafolioSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Portafolio', PortafolioSchema);
