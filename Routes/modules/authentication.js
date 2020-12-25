var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  useremail: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: { type: String, required: true },
  user_number: { type: String, required: true, unique: true },
  user_type: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  city: { type: String },
  locations: { type: Array },
  seller_img: { type: String },
  photo_name: { type: String },
  approved: { type: Boolean },
  // reviews: { type: Array },
});

module.exports = mongoose.model("users", userSchema);
