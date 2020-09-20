const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.db_cnn, 
        {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        });

        console.log('========================>');
        console.log('----- DB en línea ------');
        console.log('========================>');
        
    } catch (error) {
        throw new Error('==========> Error al iniciar la base de datos analizar LOGS <==========')
    }


}

module.exports = {
    dbConnection
}
