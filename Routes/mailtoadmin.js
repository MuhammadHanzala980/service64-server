const express = require('express')
const app = express.Router()
const nodemailer = require('nodemailer')
const smtpPool = require('nodemailer-smtp-pool');

require('dotenv').config()
app.post('/mailtoadmin', async (req, res) => {
    try {
        let transporter = nodemailer.createTransport(smtpPool({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:'service64test@gmail.com',
                pass: 'testforService64',
            }
        }))
        let mailOptions = {
            from:'"Service64" <service64test@gmail.com>',
            to: 'service64bd@gmail.com',
            subject: 'Testing and sendmail',
            text: 'For clients with plaintext support only',
            html: '<h3> Name: ' + req.body.name + '</h3>' + '<h4> Email: ' + req.body.email + '</h4>' + '<p> Message: ' + req.body.message + '</p>',
        }

        await transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                res.send({
                    message: 'Error',
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
    }
    catch (err) {
        res.json("Not send !");
    }
})

module.exports = app