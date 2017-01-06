var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    formattedLocation: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    date: {
        //
    },
    url: {
        //
    },
    comments: {
        type: String
    }
});

module.exports = mongoose.model('Job', JobSchema);
