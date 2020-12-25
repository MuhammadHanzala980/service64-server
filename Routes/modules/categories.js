const mongoose = require('mongoose');

const category = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Categories', category);