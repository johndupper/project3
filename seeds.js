//* required for this seeds file to function
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var User = require('./models/user');
var Job = require('./models/job');

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
})
    .then(function() {
        var job = new Job({
            title: 'Front-End Web Developer',
            company: 'General Assembly',
            city: 'Atlanta',
            description: 'This job is pretty legit. You should apply. Right now. Do it.'
        });
        var job2 = new Job({
            title: 'Back-End Web Developer',
            company: 'Not Home Depot',
            city: 'Atlanta',
            description: 'This job is a job.'
        });
        return Job.create([job, job2]);
    })
    .then(function(jobs) {
        console.log('job1: ' + jobs[0] + ' job2: ' + jobs[1]);
    })
    .then(function() {
    quit();
});
