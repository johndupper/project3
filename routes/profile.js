var express = require('express');
var router = express.Router();

var Job = require('../models/job');

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

// index route for logged in user // jobs data for user
router.get('/jobs', function(req, res, next) {
    Job.find({})
            .then(function(jobs) {
                res.json(jobs);
            });
});

router.get('/jobs/:id', function(req, res) {
    // specific job by id

});

module.exports = router;
