const express = require('express')
const app = express.Router()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '708414183048-9t60u5hjo5rallni89g61pmh5nhndcdt.apps.googleusercontent.com';
const CLEINT_SECRET = 'WliuNJPxl3nxMXOip8TnWSA6';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04sVrNYco17NyCgYIARAAGAQSNwF-L9Ir_1vr23DCrO5-uyEean_XjIsTWqMP65qEFXQLR702DhOku_4un8TYOjB_tyesy1VEp9s'

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(req) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'service64test@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        let mailOptions = {
            from: '"Service64" <service64test@gmail.com>',
            to: ' support@service64.com',
            subject: '',
            text: 'For clients with plaintext support only',
            html: '<h3> Name: ' + req.body.name + '</h3>' + '<h4> Email: ' + req.body.email + '</h4>' + '<p> Message: ' + req.body.message + '</p>',
        }

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}





app.post('/mailtoadmin', async (req, res) => {
    await sendMail(req)
        .then((result) => {
            res.send({
                data: result,
            })
        })
        .catch((error) => {
            res.send({
                message: 'Error',
                data: error
            })
        })
})

module.exports = app