const express = require("express");
const app = express.Router();
const saller = require("./modules/authentication");

app.post("/listing", (req, res) => {
    console.log(req.body.description);
    saller.find({ user_number: req.body.phone_number, _id: req.body._id })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                if (user[0].user_number === req.body.phone_number) {
                    saller.updateMany(
                        { _id: req.body._id },
                        {
                            fullname: req.body.fullname,
                            description: req.body.description,
                            user_type: req.body.user_type,
                            category: req.body.category,
                            city: req.body.city,
                            locations: req.body.location,
                        }
                    ).then((suc) => {
                        res.json(suc);
                    })
                        .catch((err) => {
                            res.json(err);
                        });
                }
            }

            else {
                saller.find({ user_number: req.body.phone_number })
                    .exec()
                    .then((user) => {
                        console.log('ELSE');
                        if (user.length >= 1) {
                            return res.send({
                                message: "Number Already exists, Use another Number !",
                            });
                        }
                        else {
                            saller.findByIdAndUpdate(
                                { _id: req.body._id },
                                {
                                    fullname: req.body.fullname,
                                    description: req.body.description,
                                    user_type: req.body.user_type,
                                    category: req.body.category,
                                    city: req.body.city,
                                    locations: req.body.location,
                                    user_number: req.body.phone_number,
                                }
                            ).then((suc) => {
                                res.json(suc);
                            })
                                .catch((err) => {
                                    res.json(err);
                                });
                        }
                    });
            }
        });

});

app.post("/photo", (req, res) => {
    console.log(req.body);
    saller.updateMany(
        { _id: req.body._id },
        {
            seller_img: req.body.seller_img,
            photo_name: req.body.photo_name,
        }
    ).then((suc) => {
        res.json(suc);
    })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = app