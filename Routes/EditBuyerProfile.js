const express = require("express");
const app = express.Router();
const buyer = require("./modules/authentication");

app.post("/listing", (req, res) => {
    console.log(req.body);
    buyer.find({ useremail: req.body.useremail, _id: req.body._id })
    .exec()
        .then((user) => {
            if (user.length >= 1) {
                if (user[0].useremail === req.body.useremail) {
                    buyer.updateMany(
                        { _id: req.body._id },
                        { fullname: req.body.fullname, }
                    ).then((suc) => {
                        res.json({
                            data: suc,
                            message: 'Your Details Updated'
                        });                    })
                        .catch((err) => { res.json(err); });
                }
            }

            else {
                buyer.find({ useremail: req.body.useremail })
                    .exec()
                    .then((user) => {
                        console.log('ELSE');
                        if (user.length >= 1) {
                            return res.send({
                                message: "Email Already exists, Use another Email !",
                            });
                        }
                        else {
                            buyer.updateMany(
                                { _id: req.body._id },
                                {
                                    fullname: req.body.fullname,
                                    useremail: req.body.useremail

                                }
                            ).then((suc) => {
                                res.json({
                                    data: suc,
                                    message: 'Your Details Updated'
                                });
                            })
                                .catch((err) => {
                                    res.json(err);
                                });
                        }
                    });
            }
        });

});

module.exports = app
