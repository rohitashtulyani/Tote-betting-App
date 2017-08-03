var express  = require('express');
var router = express.Router();
var path = require('path');
var Race = require(path.join('../', 'app/race'));

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/', function(req, res, next) {
 	return res.render('home', {
		title : "Home"
	});
});

router.post('/races', function(req, res, next) {
	Race.start(req.body, function(err, resp){
		console.log("resp.raceId is ::", resp.raceId);
			return res.render('race', {
				title : "Race",
				raceId : resp.raceId
			});
		});
});

router.get('/races/:raceId', function(req, res, next) {
 	return res.render('race', {
		title : "Race",
		raceId : req.raceId
	});
});

module.exports = router;