var express = require('express');
var router = express.Router();

var Job = require('../models/job');

/*  ROUTES:
 *   1. index    (GET)
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


module.exports = router;
