const mongoose = require('mongoose');

const location = new mongoose.Schema({
    label: { type: String, required: true, },
    locations: [Object]
})
module.exports = mongoose.model('Locations', location);