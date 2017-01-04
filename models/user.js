var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    local: {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }},
    { timestamps: true }  // createdAt, updatedAt
);

module.exports = mongoose.model('User', UserSchema);
