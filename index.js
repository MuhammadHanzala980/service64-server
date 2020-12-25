require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const post = require('./Routes/search.js');
const authentication = require('./Routes/authentication');
const saller = require('./Routes/saller');
const editListing = require('./Routes/EditSallerListing');
const editBuyerProfile = require('./Routes/EditBuyerProfile');
const admin = require('./Routes/admin')
const passwordReset = require('./Routes/PasswordReset')
var connection = require('./Connection/connection');
const mailtoadmin = require('./Routes/mailtoadmin')
const app = express();
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5000kb' }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('server is running Now')
})
app.use('/app', post)
app.use('/app/auth', authentication)
app.use('/app/listing/', saller)
app.use('/app/edit/saller/', editListing)
app.use('/app/edit/buyer/', editBuyerProfile)
app.use('/app/admin', admin)
app.use('/app/mail', mailtoadmin)
app.use('/app/pwdreset/', passwordReset)

app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});