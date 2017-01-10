var express = require('express');
var router = express.Router();
var request = require('request');

var Job = require('../models/job');

/*
    ROUTES:
    1. /jobs        GET     get current user's jobs                             X
    2. /jobs/:id    GET     get specific job in order to edit it
    3. /jobs/:id    PUT     get specific job, edit that shit
    4. /jobs/:id    DELETE  delete this specific job from user's saved jobs
 */

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

// get saved jobs
router.get('/jobs', authenticate, function(req, res) {
    Job.find({user: req.user})
        .then(function(jobs) {
            res.json(jobs);
        });
});

router.post('/jobs', authenticate, function(req, res) {
    var thisJob = new Job({
        user: currentUser._id,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        formattedLocation: req.body.formattedLocation,
        snippet: req.body.snippet,
        date: req.body.date
    });
    console.log('this job: ', thisJob);
    Job.create(thisJob);
});

router.delete('/jobs', authenticate, function(req, res) {
    console.log('FOUND JOB TO DELETE: ', req.params.id);
});

module.exports = router;