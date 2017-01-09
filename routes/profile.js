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

router.get('/jobs', function(req, res, next) {
    console.log('server request');
    Job.find({})
            .then(function(job) {
                res.json(job);
            });
});


    // Job.find({ user: req.user.id })
    //     .then(function(job) {
    //         console.log('user id: ' + req.user.id);
    //         console.log(job);
    //         res.render('profile', {
    //             job: job
    //         });
    //     });


module.exports = router;
