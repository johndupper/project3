var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        message: req.flash()
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {
        message: req.flash()
    });
});

router.post('/signup', function(req, res, next) {
    var signupStrategy = passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
    return signupStrategy(req, res, next);
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        message: req.flash()
    });
});

router.post('/login', function(req, res, next) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    });
    return loginProperty(req, res, next);
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
