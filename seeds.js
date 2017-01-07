// required for mongoose modeling
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

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

console.log('emptying and re-seeding local database');

User.remove({})
    .then(function() {
        return Job.remove({});
    })
    .then(function() {
        var user1 = new User({
            local: {
                email: 'john',
                password: bcrypt.hashSync('test',  bcrypt.genSaltSync(8))
            }
        });
        var user2 = new User({
            local: {
                email: 'john2',
                password: bcrypt.hashSync('test',  bcrypt.genSaltSync(8))
            }
        });
        return User.create([user1, user2]);
    })
    .then(function(users) {
        var job1 = new Job({
            user: users[0]._id,
            jobtitle: 'Job Title 1',
            company: 'Company 1',
            formattedLocation: 'Atlanta, GA',
            snippet: 'This is job 1 at company 1',
            date: '1/6/2017',
            url: 'www.job1.com',
            comments: 'This comment belongs to job 1'
        });
        var job2 = new Job({
            user: users[0]._id,
            jobtitle: 'Job Title 2',
            company: 'Company 2',
            formattedLocation: 'Atlanta, GA',
            snippet: 'This is job 2 at company 1',
            date: '2/6/2017',
            url: 'www.job2.com',
            comments: 'This comment belongs to job 2'
        });
        return Job.create([job1, job2]);
    })
    .then(function() {
        quit();
    });
