const express = require("express");
const app = express.Router();
const saller = require("./modules/authentication");
const bcrypt = require("bcrypt");

app.post("/get_listing", (req, res) => {
  let skip = 0
  let arr = []
  if (req.body.skip !== undefined) {
    skip = req.body.skip;
  }
  saller
    .find({
      user_type: "Seller",
      // approved: true
    })
    .skip(Number(skip))
    .limit(Number(16))
    .exec()
    .then((list) => {
      arr = list.splice(0, 15)
      res.send({
        item: list.length,
        listing: arr
      })
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add_listing", (req, res) => {
  saller.find({ user_number: req.body.phone_number })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.send({
          message: "Number Already exists, Use another Number !",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err, 'err');
            res.json({
              error: err,
            });
          } else {
            const saller_detaile = new saller({
              fullname: req.body.saller_name,
              description: req.body.description,
              password: req.body.password,
              user_number: req.body.phone_number,
              user_type: req.body.user_type,
              category: req.body.category,
              city: req.body.city,
              locations: req.body.location,
              seller_img: req.body.saller_img,
              photo_name: req.body.photo_name,
              approved: true,
            });
            saller_detaile
              .save()
              .then((suc) => {
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

app.post("/get_listing/usr", (req, res) => {
  console.log(req.body);
  saller
    .find({ _id: req.body._id })
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/del_listing", async (req, res) => {
  try {
    await saller.deleteOne({ _id: req.body._id }).then((result) => {
      res.json("Item deleted !");
    });
  } catch (error) {
    res.json("Item Not Deleted !");
  }
});

module.exports = app;
