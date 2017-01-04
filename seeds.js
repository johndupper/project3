//* required for this seeds file to function
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = require('./models/user');

//* we added this
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect('mongodb://localhost/project3');
}
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
});

//* we need to disconnect when the seeds file is done
function quit() {
    console.log('mongoose disconnecting called');
    mongoose.disconnect();
}

//* let us know if something went wrong with seeding database locally
function handleError(error) {
    console.log('seeds error: ', error);
    quit();
    return error;
}

console.log('emptying and re-seeding local database');
User.remove({})
    .then(function() {
        console.log('creating one new user');
        var jungmin = new User({
            local: {
                email: 'j@test.com',
                password: ' test'
            }
        });
        return User.create(jungmin);
    }).then(function(user) {
        console.log('new user: ', user);
}).then(function() {
    quit();
});
