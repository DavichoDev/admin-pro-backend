require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Base de datos
dbConnection();

console.log(process.env);

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true, 
        msg: 'Hola mundo'
    })

});

app.listen( process.env.port , () => {
    console.log('Servidor corriendo en puerto: ' + process.env.port );
})