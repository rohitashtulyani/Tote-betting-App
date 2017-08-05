'use strict';

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
		if(err){
			next(err);
		}else{
			return res.render('races', {
				raceId : resp.raceId
			});
		}	
	})
});

router.get('/races/:raceId', function(req, res, next) {
 	return res.render('races', {
		raceId : req.raceId
	});
});

module.exports = router;