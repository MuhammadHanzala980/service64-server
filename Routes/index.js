// require('dotenv/config');
// const express = require('express');
// const bodyParser = require('body-parser');
// const post = require('./Routes/search.js');
// const authentication = require('./Routes/authentication');
// const seller = require('./Routes/saller');
// const admin = require('./Routes/admin')
// var connection = require('./Connection/connection');

// const app = express();
// const cors = require('cors')
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '5000kb' }));
// app.use(cors())

// app.get('/', (req, res) => {
//     res.send('server is running Now')
// })
// app.use('/app', post)
// app.use('/app/auth', authentication)
// app.use('/app/listing', seller)
// app.use('/app/admin', admin)

// app.set('port', process.env.PORT || 9000);
// var server = app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + server.address().port);
// });