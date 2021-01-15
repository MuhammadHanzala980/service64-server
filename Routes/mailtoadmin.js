const express = require('express')
const app = express.Router()
const nodemailer = require('nodemailer')
const smtpPool = require('nodemailer-smtp-pool');
const { googleapis, google } = require('googleapis')


require('dotenv').config()
app.post('/mailtoadmin', async (req, res) => {
    const CLIENT_ID = '71728934820-75nud3o9qbi1d1rrqpmth7q8t259ih2l.apps.googleusercontent.com'
    const CLIENT_SECRET = 'lYE6VCLEFcx-KM83-gGidrMG'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN = '1//04C9S5jWp8u1MCgYIARAAGAQSNwF-L9IruoSaAcq3G0hVpLtLyQNRM1tr3nzxff8Yd-0PwSZZevCvlZBrzo7-FHTpQuLa_rjgLHU'
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    console.log(oAuth2Client);

    try {
        await oAuth2Client().then((token) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'service64test@gmail.com',
                    pass: 'testforService64',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })
            let mailOptions = {
                from: '"Service64" <service64test@gmail.com>',
                to: 'service64bd@gmail.com',
                subject: 'Testing and sendmail',
                text: 'For clients with plaintext support only',
                html: '<h3> Name: ' + req.body.name + '</h3>' + '<h4> Email: ' + req.body.email + '</h4>' + '<p> Message: ' + req.body.message + '</p>',
            }

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    res.send({
                        message: 'Not Send',
                        err: err
                    })
                }
                else {
                    res.send({
                        message: 'Recvied your message',
                        data: data
                    })
                }
            })
            console.log(transporter);
            res.send(token)
        })
            .catch((err) => {
                res.send({ err })
            })

    }
    catch (err) {
        res.json("Not send !");
    }
})

module.exports = app