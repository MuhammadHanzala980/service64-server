const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true
    },

})
// exports.StudentModel = mongoose.model('students', StudentSchema);


module.exports = mongoose.model('Posts', PostSchema);