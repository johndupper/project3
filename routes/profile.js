var express = require('express');
var router = express.Router();

var Job = require('../models/job');

/*  ROUTES:
 *   1. index    (GET)
 *   2. api/jobs (GET)
 */

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/', authenticate, function(req, res) {
    res.render('profile');
});

router.get('/api/jobs', authenticate, function(req, res) {
    Job.find({})
        .then(function(jobs) {
            res.json(jobs);
        });
});

module.exports = router;
