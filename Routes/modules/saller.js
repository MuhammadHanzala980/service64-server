var mongoose = require("mongoose");

mongoose.set('useCreateIndex', true)

const seller = new mongoose.Schema({
    saller_name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    phone_number: { type: Number, required: false },
    saller_img: { type: String, required: true },
    user_id: { type: String, required: true },
    approved: { type: Boolean, required: true }
})

module.exports = mongoose.model("selleres", seller)
