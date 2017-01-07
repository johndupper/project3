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

router.get('/', authenticate, function(req, res, next) {
    res.render('search');
});

router.get('/results', authenticate, function(req, res, next) {
    request('http://api.indeed.com/ads/apisearch?publisher=9447015102421242&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var testJSON = JSON.parse(body);
                console.log(testJSON);
                res.render('results', {
                    api: testJSON
                });
            }
        });
});

module.exports = router;