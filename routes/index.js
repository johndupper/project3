var express = require('express');
var router = express.Router();
var passport = require('passport');


/*  ROUTES:
*   1. index   (GET)
*   2. sign up (GET)
*   3. sign up (POST)
*   4. log in  (GET)
*   5. log in  (POST)
*   6. log out (GET)
*/

router.get('/', function(req, res) {

    res.render('landing');
});

router.get('/signup', function(req, res) {
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

router.get('/login', function(req, res) {
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

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
