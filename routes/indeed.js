var express = require('express');
var router = express.Router();
var request = require('request');

function authenticate(req, res, next) {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Please signup or login.');
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/', function(req, res) {
    var jobString = req.query.jobString;
    var locationString = req.query.locationString;

    console.log('JOB SEARCH PARAMETERS: ', jobString, locationString);


    // return console.log('CAN WE RETURN SOMETHING FROM HERE MAYBE no');
    request('http://api.indeed.com/ads/apisearch?publisher=9447015102421242&q=' +jobString+'&l='+locationString+ '&sort=date&radius=&st=&jt=&start=&limit=25&fromage=30&filter=&latlong=&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json',
        function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
            // indeedResults = JSON.stringify(body);
            indeedResults = JSON.parse(body);
            res.send(indeedResults);
        }
    });
});

module.exports = router;
