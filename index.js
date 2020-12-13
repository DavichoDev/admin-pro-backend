require('dotenv').config();

const path = require('path');

let express = require('express');
let cors = require('cors');

let { dbConnection } = require('./database/config');

let fileupload = require('express-fileupload');

// Crear el servidor express
let app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del Body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// Rutas
app.use('/api/hospitales', require('./routes/hospitales.routes') );
app.use('/api/medicos', require('./routes/medicos.routes') );
app.use('/api/usuarios', require('./routes/usuarios.routes') );
app.use('/api/todo', require('./routes/busquedas.routes'));
// Rutas que soportan archivos
app.use('/api/uploads', require('./routes/uploads.routes'));
// Rutas de autentificación
app.use('/api/auth', require('./routes/auth.routes') );
//
app.use('/api/polizona', require('./routes/polizona.routes') );

// Lo ultimo
app.get('*', (req, response) => {

    response.sendFile( path.resolve(__dirname, 'public/index.html') );

});

app.listen( process.env.PORT || 3000 , () => {
    console.log('Servidor corriendo... en >>>>: ', process.env.PORT || 3000 );
}); 