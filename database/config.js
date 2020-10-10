let mongoose = require('mongoose');
require('dotenv').config();

let dbConnection = async () => {

    try {

        await mongoose.connect(
            process.env.DB_CNN, 
        {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        });

        console.log('========================>');
        console.log('----- DB en linea ------');
        console.log('========================>');
    } catch (error) {
        console.log("Error al iniciar la base de datos ==========> : ", error);
    }


}

module.exports = {
    dbConnection
}
