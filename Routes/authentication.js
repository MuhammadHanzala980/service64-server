const express = require("express")
const account = express.Router()
const bcrypt = require("bcrypt");
const User = require("./modules/authentication");
account.post("/signup", (req, res) => {
    User.find({ useremail: req.body.email }).exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.send({
                    message: "Email Already exists, Use another Email !",
                })
            }
            else {
                User.find({ user_number: req.body.number }).exec()
                    .then((user) => {
                        if (user.length >= 1) {
                            return res.send({
                                message: "Number Already exists, Use another Number !",
                            })
                        }
                        else {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    res.json({
                                        error: err
                                    });
                                }
                                else {
                                    const user = new User({
                                        fullname: req.body.fullName,
                                        useremail: req.body.email,
                                        password: req.body.password,
                                        user_type: req.body.user_type,
                                        user_number: req.body.phone_number,
                                    })

                                    user.save().then((success) => {
                                        res.status(201).json({
                                            message: "User Created",
                                            user: success
                                        })
                                    }).catch((err) => {
                                        res.json({
                                            error: err,
                                            message: 'The Email you entered is already registered here, so please try a new one.'
                                        })
                                    })
                                }
                            })
                        }
                    })
            }
        })
})

// ====>>>  Sign In Route

account.post("/signin", (req, res) => {
    const loginByEmail = req.body.email
    const loginByNumber = req.body.number

    if (loginByEmail !== undefined) {
        User.find({ useremail: req.body.email }).exec().
            then((user) => {
                if (user.length < 1) {
                    res.send({
                        message: "Invalid email or username !"
                    })
                }
                else {
                    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                        if (err) {
                            await res.status(200).json({
                                message: "Invalid email or password !"
                            })
                        }
                        else if (result) {
                            await res.status(200).json({
                                message: "Login Successful",
                                user: user[0]
                            })

                        }
                        else {
                            await res.status(200).json({
                                message: "Invalid email or password !"
                            })
                        }
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                })
            })
    }

    else if (loginByNumber) {

        User.find({ user_number: req.body.number }).exec()
            .then((user) => {
                if (user.length < 1) {
                    res.send({
                        message: "Invalid number or password !"
                    })
                }
                else {
                    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                        if ( req.body.password !== user[0].password) {
                            await res.send({
                                message: "Invalid email or password !"
                            })
                        }
                        else {
                            await res.status(200).json({
                                message: "Login Successful",
                                user: user[0]
                            })
                        }
                        // else {
                        //     await res.send({
                        //         message: "Invalid username or password !"
                        //     })
                        // }
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                })
            })
    }
})

module.exports = account