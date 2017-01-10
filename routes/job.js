var express = require('express');
var router = express.Router();

var Job = require('../models/job');

/*  ROUTES:
 *   1. savedjobs  (GET)
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
router.get('/savedjobs', authenticate, function(req, res) {
    Job.find({})
        .then(function(jobs) {
            res.json(jobs);
        });
});

module.exports = router;