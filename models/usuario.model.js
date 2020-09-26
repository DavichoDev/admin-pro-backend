// Modelo de Usuario de Mongoose
let { Schema, model } = require('mongoose');

let UsuarioSchema = new Schema ({

    nombre: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    // Campo para el 'Auth' de google.
    google: {
        type: Boolean,
        default: false 
    },

});

// Se cambio el nombre de la propiedad _id => uid
UsuarioSchema.method('toJSON', function() {
    // Filtramos los datos retornados por la bd.
    let { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;

    return object;

});

module.exports = model('Usuario', UsuarioSchema);
