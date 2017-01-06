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
        Job.remove({})
            .then(function() {
               var user1 = new User({ local: { email: 'test@test.com', password: 'test' }});
               return User.create(user1)
                   .then(function(user) {
                               var job = new Job({ user: user, jobtitle: 'JobTitle',
                                   company: 'Company', formattedLocation: 'Atlanta, GA',
                                   snippet: 'This is a job.', date: '1/6/2017',
                                   url: 'www.jobs.com', comments: 'Comment'
                               });
                               Job.create(job)
                                   .then(function() {
                                       quit();
                                   });
                   });
            });
    });
