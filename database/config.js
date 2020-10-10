let mongoose = require('mongoose');
require('dotenv').config();

let dbConnection = async () => {

    try {

        await mongoose.connect(
            'mongodb+srv://DavichoDev:Interpol123@@cluster0.reday.mongodb.net/hospitaldb', 
        {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        });

        console.log('========================>');
        console.log('----- DB en línea ------');
        console.log('========================>');
        
    } catch (error) {
        console.log("Error: ", error);
        console.log('=============================================================================>');
        throw new Error('==========> Error al iniciar la base de datos analizar LOGS <==========')
    }


}

module.exports = {
    dbConnection
}
