const express = require("express");
const app = express.Router();
const search = require("./modules/authentication");

app.post("/search", async (req, res) => {
  try {
    let skip = 0;
    let arr = []
    if (req.body.skip !== undefined) {
      skip = req.body.skip;
    }
    await search
      .find({
        city: req.body.city,
        locations: { $all: [req.body.location] },
        category: req.body.category,
        approved: true,
      })
      .skip(Number(skip))
      .limit(Number(16))
      .exec()
      .then((list) => {
        if (list.length > 0) {
          arr = list.splice(0, 15)
          res.send({
            message: "Item Found",
            listing: arr,
            item: list.length
          });
        } else {
          res.send({
            listing: null,
            message: "No match found, please try later...!",
          });
        }
      });
  } catch (error) {
    res.json({ message: 'error' });
  }
});

app.post("/searchbycity", async (req, res) => {
  try {
    let skip = 0;
    let arr = []
    if (req.body.skip !== undefined) {
      skip = req.body.skip;
    }

    await search
      .find({
        // approved: true,
        city: req.body.city,
      })
      .skip(Number(skip))
      .limit(Number(16))
      .exec()
      .then((list) => {
        if (list.length > 0) {
          arr = list.splice(0, 15)
          res.send({
            listing: arr,
            item: list.length,
            message: "Item Found",
          });
        } else {
          res.send({ message: "No match found, please try later" });
        }
      });
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/searchbycategory", async (req, res) => {
  try {
    let skip = 0;
    let arr = []
    if (req.body.skip !== undefined) {
      skip = req.body.skip;
    }

    await search
      .find({
        category: req.body.category,
        approved: true,

      })
      .skip(Number(skip))
      .limit(Number(16))
      .exec()
      .then((list) => {
        if (list.length > 0) {
          arr = list.splice(0, 15)
          res.send({
            listing: arr,
            item: list.length,
            message: "Item Found",
          });
        } else {
          res.send({ message: "No match found, please try later" });
        }
      });
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/searchbylocation", async (req, res) => {
  try {
    let skip = 0;
    let arr = []
    if (req.body.skip !== undefined) {
      skip = req.body.skip;
    }

    await search
      .find({
        locations: { $all: [req.body.location] },
        city: req.body.city,
        // approved: true,
      })
      .skip(Number(skip))
      .limit(Number(16))
      .exec()
      .then((list) => {
        if (list.length > 0) {
          arr = list.splice(0, 15)
          res.send({
            listing: arr,
            item: list.length,
            message: "Item Found",
          });
        } else {
          res.send({ message: "No match found, please try later" });
        }
      });
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/recommendedcategory", async (req, res) => {
  try {
    let skip = 0;
    let arr = []
    if (req.body.skip !== undefined) {
      skip = req.body.skip;
    }
    await search
      .find({
        category: req.body.category,
        city: req.body.city,
        approved: true,

      })
      .skip(Number(skip))
      .limit(Number(16))
      .exec()
      .then((list) => {
        if (list.length > 0) {
          arr = list.splice(0, 15)
          res.send({
            listing: arr,
            item: list.length,
            message: "Item Found !",
          });
        } else {
          res.send({ message: "No match found, please try later." });
        }
      });
  } catch (error) {
    res.json({ message: error });
  }
});

app.get("/getpost", async (req, res) => {
  try {
    const posts = await search.find();
    res.send(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = app;
