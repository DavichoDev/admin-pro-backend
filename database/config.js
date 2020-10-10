let mongoose = require('mongoose');
require('dotenv').config();

let dbConnection = async () => {

    try {
        let dbConnString = '';

        if (!process.env.DB_CONN || process.env.DB_CONN === undefined) {
            dbConnString = process.env.DB_CNNLOCAL;
        } else {
            dbConnString = process.env.DB_CONN;
        }        
        await mongoose.connect(dbConnString ,{useNewUrlParser: true,useUnifiedTopology: true});

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
