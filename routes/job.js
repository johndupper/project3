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
    console.log(req.user._id);
    Job.find({user: req.user})
        .then(function(jobs) {
            res.json(jobs);
        });
});

router.delete('/deletejob', authenticate, function(req, res) {
    console.log('FOUND JOB TO DELETE: ', req.params.id);
    Job.findByIdAndRemove(req.params.id)
        .then(function() {
            console.log('delete job maybe');
        });
});

module.exports = router;