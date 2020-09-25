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
app.use('/api/medicos', require('./routes/medicos.routes') );
app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/hospitales', require('./routes/hospitales.routes') );
app.use('/api/login', require('./routes/auth.routes') );
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));

app.listen( process.env.port , () => {
    console.log('Servidor corriendo en puerto: ' + process.env.port );
});