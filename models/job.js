var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
});

module.exports = mongoose.model('Job', JobSchema);