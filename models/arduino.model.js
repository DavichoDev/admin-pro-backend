// Modelo de Usuario de Mongoose
let { Schema, model } = require('mongoose');

let ArduinoSchema = new Schema ({

    generador: {
        type: Number,
        required: true,
    },
    patio: {
        type: Number,
        required: true,
    },
    puerta: {
        type: Number,
        required: true,
    }

});

// Filtro BD
ArduinoSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Arduino', ArduinoSchema);
