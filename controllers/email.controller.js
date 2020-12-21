// Contoladores de EMAIL

let { response } = require('express');
let nodemailer = require('nodemailer'); 
const { google } = require('googleapis')
//Modelo del formulario

// Cliente oAuth
const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_EMAIL, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

let enviarEmail = async () => {

    try {

        const accessToken = await oAuth2Client.getAccessToken().catch((error) => {console.log('error en el token> ', error)});

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'customwoods.contacto@gmail.com',
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET_EMAIL,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken 
            } 
        });

        const mailOptions = {
            from: 'CustomWoods <customwoods.contacto@gmail.com>',
            to: 'gerardoct@ciencias.unam.mx',
            subject: "Hola mundillo :3 desde la API de GoogleMail",
            text: 'Sin texto por sluttest',
            html: `<h1>Hola Mundillo senor Sluttest :3</h1>`
        };

        return await transport.sendMail(mailOptions); 

    } catch (error) {
        return error;
    }

}  

let postEmail = async (req, res = response) => {

    try{
        
        let envioEmail = await 
        enviarEmail()
        .then( ( result ) => console.log( 'Email enviado...', result ) )
        .catch( ( error ) => {
            console.log('Error al enviar email... ', error );
            res.status(500).json({
                ok: false, 
                msg: 'Se produjo un error al enviar el correo.'
            });    
        }); 

        res.json({
            ok: true,
            msg: 'Email enviado exitosamente a: '
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'El servidor tuvo un problema.'
        });
    }
};

module.exports = { enviarEmail, postEmail };