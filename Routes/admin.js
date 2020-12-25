const express = require('express');
const admin = express.Router()
const listing = require('./modules/authentication')
const category = require('./modules/categories')
const city = require('./modules/cities')
const location = require('./modules/locations');
const { update } = require('./modules/saller');

admin.post('/get_unapproved_listing', (req, res) => {
    listing.find({ user_type: 'Seller' })
        .then((list) => {
            res.send(list)
        })
        .catch((err) => {
            console.log(err);
        })
})

admin.post('/apr_listing', async (req, res) => {
    try {
        const approved = await listing.updateOne(
            { _id: req.body._id },
            { $set: { approved: true } }
        )
        res.json(approved)
    } catch (error) {
        res.json({ message: error })
    }
})

admin.post('/unapr_listing', async (req, res) => {
    try {
        const approved = await listing.updateOne(
            { _id: req.body._id },
            { $set: { approved: false } }
        )
        res.json(approved)
    } catch (error) {
        res.json({ message: error })
    }
})

admin.post('/admin_delete_listing', async (req, res) => {

    try {
        await listing.deleteOne({ _id: req.body._id })
            .then((result) => {
                res.json("Item deleted !")
            })
    } catch (error) {
        res.json("Item Not Deleted !")
    }
})


admin.post('/add_cat', (req, res) => {
    category.find({ label: req.body.label }).exec()
        .then((item) => {
            if (item.length >= 1) {
                return res.send({
                    message: "This Category Already exists !",
                })
            }
            else {
                const post = new category({
                    label: req.body.label,
                });
                try {
                    const saved = post.save();
                    res.json(saved);
                }
                catch (err) {
                    res.json({ msg: err });
                }
            }
        })
})

admin.get('/get_cat', (req, res) => {
    category.find()
        .then((list) => {
            res.send(list)
        })
        .catch((err) => {
            console.log(err);
        })
})

admin.post('/del_cat', async (req, res) => {

    try {
        await category.deleteOne({ _id: req.body._id })
            .then((result) => {
                res.json("Item deleted !")
            })
    } catch (error) {
        res.json("Item Not Deleted !")
    }
})

admin.post('/edt_cat', async (req, res) => {
    try {
        const edit = await category.updateOne(
            { _id: req.body._id },
            { $set: { label: req.body.label } }
        )
        res.json(edit)
    } catch (error) {
        res.json({ message: error })
    }
})


admin.post('/add_cit', (req, res) => {
    city.find({ label: req.body.label }).exec()
        .then((item) => {
            if (item.length >= 1) {
                return res.send({
                    message: "This City Already exists !",
                })
            }
            else {
                const post = new city({
                    label: req.body.label,
                });
                try {
                    const saved = post.save();
                    res.json(saved);
                }
                catch (err) {
                    res.json({ msg: err });
                }
            }
        })
})

admin.get('/get_cit', (req, res) => {
    city.find()
        .then((list) => {
            res.send(list)
        })
        .catch((err) => {
            console.log(err);
        })
})

admin.post('/del_cit', async (req, res) => {

    try {
        await location.deleteOne({ _id: req.body._id })
            .then((result) => {
                res.json("Item deleted !")
            })
    } catch (error) {
        res.json("Item Not Deleted !")
    }
})

admin.post('/edt_cit', async (req, res) => {
    try {
        const edit = await location.updateOne(
            { _id: req.body._id },
            { $set: { label: req.body.label } }
        )
        res.json(edit)
    } catch (error) {
        res.json({ message: error })
    }
})


admin.post('/add_loc', (req, res) => {
    let locations = req.body.locations
    location.find({ label: req.body.label }).exec()
        .then((item) => {
            if (item.length >= 1) {
                if (item.locations === null) {
                    location.findOneAndUpdate(
                        { label: req.body.label },
                        { $set: { locations } }
                    ).then((update) => {
                        res.send({
                            data: update
                        })
                    })
                }
                else {
                    location.findOneAndUpdate(
                        { label: req.body.label },
                        { $addToSet: { locations } }
                    ).then((update) => {
                        res.send({
                            data: update
                        })
                    })
                }
            }
            else {
                if (locations == undefined) {
                    locations = []
                }
                const post = new location({
                    label: req.body.label,
                    locations: req.body.locations,
                });
                post.save().then((suc) => {
                    res.send({
                        message: 'Item Seved',
                        data: suc
                    })
                }).catch((err) => {
                    res.send({ msg: err });
                })
            }
        })
})

admin.get('/get_loc', (req, res) => {
    location.find()
        .then((list) => {
            res.send(list)
        })
        .catch((err) => {
            res.send(err)
        })
})

admin.post('/del_loc', async (req, res) => {
    location.updateOne(
        { _id: req.body._id },
        { $set: { locations: req.body.locations } }
    ).then((update) => {
        res.send({
            data: update
        })
    })
})

admin.post('/edt_loc', async (req, res) => {
    try {
        const edit = await location.updateOne(
            { _id: req.body._id },
            { $set: { locations: req.body.locations } }
        )
        res.json(edit)
    } catch (error) {
        res.json({ message: error })
    }
})

module.exports = admin