let {OAuth2Client} = require('google-auth-library');
let client = new OAuth2Client(process.env.google_id);

let googleVerify = async ( token ) => {
  
    let ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.google_id,
    });
    let payload = ticket.getPayload();
    let userid = payload['sub'];

    let { name, email, picture } = payload;

    return { name, email, picture };

}

module.exports ={
    googleVerify,
}