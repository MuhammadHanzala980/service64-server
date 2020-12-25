const express = require("express");
const app = express.Router();
const saller = require("./modules/authentication");

app.post("/update", (req, res) => {
    saller.find({ _id: req.body._id }).exec()
        .then((user) => {
            if (user[0].password === req.body.currentPass) {
                saller.updateMany(
                    { _id: req.body._id, },
                    { password: req.body.password, }
                ).then((suc) => { res.json({ message: "Password Updated !", resulte: true }); }).catch((err) => { res.json(err); });
            }
            else{
                res.json({
                    resulte : false,
                    message: 'Invalide Password !'
                })
            }
        })
});

app.post("/buyer", (req, res) => {
    saller.updateMany(
        { _id: req.body._id, },
        { password: req.body.password, }
    ).then((suc) => { res.json(suc); }).catch((err) => { res.json(err); });
});


module.exports = app