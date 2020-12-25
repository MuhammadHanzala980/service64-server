const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const uri = 'mongodb+srv://hanzala:anomno@cluster0-zwkdx.mongodb.net/Cluster0?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function (req, res) {
    res.send("Welcome to My App :-)")
})

app.get('/contect', function (req, res) {
    res.send("Welcome to My App :-)")
})

app.get('/calculator', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/calculator', function (req, res) {
    let n1 = Number(req.body.v1)
    let n2 = Number(req.body.v2)
    let sum = n1 + n2

    res.send("the sum of the two numbers is :" + sum)
})

// app.listen(3000, function () {
//     console.log('server is running')
// })