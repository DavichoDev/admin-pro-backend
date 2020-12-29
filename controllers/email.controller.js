// Contoladores de EMAIL

let { response } = require('express');
let nodemailer = require('nodemailer'); 
const { google } = require('googleapis')
//Modelo del formulario

// Cliente oAuth
const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_EMAIL, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

let enviarEmail = async ( campos ) => {

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
            from: 'CustomWoods CONTACTO <customwoods.contacto@gmail.com>',
            to: campos.correo,
            subject: "Solicitud de CustomWoods",
            text: 'Hola, ' + campos.nombre + ' hemos recibido tu solicitud, recuerda que el plazo de respuesta es de 3 días aproximadamente',
            html: 
            `<h1>Recibo de peticion de customWoods: ''`+ campos.tipoSolicitud +`'' </h1>
            <h3>Hola `+ campos.nombre +`, hemos recibido tu solicitud.</h3>
            <h3>La solicitud de su mueble se esta evaluando...</h3>
            <h3>Su mueble de tipo: `+ campos.tipoMueble +` esta siendo presupuestado.</h3>
            <h4>Atte: CustomWoods</h4>
            `
        };

        const mailOptionsCustomWoods = {
            from: 'CustomWoods CONTACTO <customwoods.contacto@gmail.com>',
            to: 'customwoods.contacto@gmail.com',
            subject: "Solicitud de CustomWoods",
            text: 'Solicitud de: ' + campos.nombre,
            html: 
            `
            <h1>Recibo de peticion de customWoods: ''`+ campos.tipoSolicitud +`'' </h1>
            <h2>Información de CONTACTO DEL PEDIDO</h2>
            <h3>Nombre del solicitante:`+ campos.nombre +`</h3>
            <h3>Apellido Paterno: `+ campos.apellidoPat +`</h3>
            <h3>Apellido Materno: `+ campos.apellidoMat +`</h3>
            <h3>Correo electronico: `+ campos.correo +`</h3>
            <h3>Número telefonico: `+ campos.numeroTel +`</h3>
            <h3>Número telefonico Fijo: `+ campos.numeroFijo +`</h3>
            <h3>Domicilio: `+ campos.domicilio +`</h3>
            <h3>Codigo postal: `+ campos.codigoPostal +`</h3>
            <h2>Información del MUEBLE A SOLICITAR</h2>
            <h3>TIPO DE SOLICITUD: `+ campos.tipoSolicitud +`</h3>
            <h3>Alto: `+ campos.alto +` m</h3>
            <h3>Largo: `+ campos.largo +` m</h3>
            <h3>Ancho: `+ campos.ancho +` m</h3>
            <h3>Material de la madera: `+ campos.material +`</h3>
            <h3>Tipo de mueble: `+ campos.tipoMueble +`</h3>
            <h3>Imagen: `+ campos.file +`</h3>
            <h3>Color: `+ campos.color +`</h3>
            <h3>Acabado: `+ campos.acabado +`</h3>
            `
        };

        await transport.sendMail(mailOptionsCustomWoods)
        return await transport.sendMail(mailOptions); 

    } catch (error) {
        return error;
    }

}  

let postEmail = async (req, res = response) => {

    try{

        const campos = req.body;

        let envioEmail = 
        await enviarEmail(campos)
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
            msg: 'Email enviado exitosamente a: ' + campos.nombre
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