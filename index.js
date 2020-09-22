require('dotenv').config();

let express = require('express');
let cors = require('cors');

let { dbConnection } = require('./database/config');

// Crear el servidor express
let app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del Body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/login', require('./routes/auth.routes') );

app.listen( process.env.port , () => {
    console.log('Servidor corriendo en puerto: ' + process.env.port );
});