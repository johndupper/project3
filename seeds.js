// required for mongoose modeling
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose models
var User = require('./models/user');
var Job = require('./models/job');

// we added this
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/project3');
}

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
});

// we need to disconnect when the seeds file is done
function quit() {
    console.log('mongoose disconnecting called');
    mongoose.disconnect();
}

// let us know if something went wrong with seeding database locally
function handleError(error) {
    console.log('seeds error: ', error);
    quit();
    return error;
}

console.log('emptying and re-seeding local database');

User.remove({})
    .then(function() {
        Job.remove({});
        console.log('creating one new user');
        var jungmin = new User({
            local: {
                email: 'j@test.com',
                password: ' test'
            }
        });

        var phil = new User({
            local: {
                email: 'p@test.com',
                password: ' test'
            }
        });
        return User.create([jungmin, phil]);
    })
    .then(function(users) {
        console.log('new user: ', users[0], users[1]);
        return users;
    })
    .then(function(users) {
        var job = new Job({
            user: users[0],
            jobtitle: 'JobTitle',
            company: 'Company',
            formattedLocation: 'Atlanta, GA',
            snippet: 'This is a job.',
            date: '1/6/2017',
            url: 'www.jobs.com',
            comments: 'Comment'
        });

        var job2 = new Job({
            user: users[1],
            jobtitle: 'JobTitle2',
            company: 'Company2',
            formattedLocation: 'Atlanta, GA2',
            snippet: 'This is a job.2',
            date: '1/6/2018',
            url: 'www.jobs2.com',
            comments: 'Comment2'
        });
        return Job.create([job, job2]);
    })
    .then(function(jobs) {
        console.log('job1: ' + jobs[0] + ' job2: ' + jobs[1]);
    })
    .then(function() {
    quit();
});
