const mongoose = require('mongoose');

const city = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Cities', city);