var express = require('express');
var router = express.Router();
var request = require('request');

var Job = require('../models/job');

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = router;
