var express = require('express');
var router = express.Router();
var passport = require('passport');

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    }
    else {
        next();
    }
}

router.get('/', function(req, res, next) {
    res.send('test');
});

module.exports = router;