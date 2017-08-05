'use strict';

var express  = require('express');
var router = express.Router();
var Race = require('../app/race');

// raceId set in req as param
router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

//get route
router.get('/', function(req, res, next) {
 	return res.render('home', {
		title : "Home"
	});
});

//post route
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

//get route
router.get('/races/:raceId', function(req, res, next) {
 	return res.render('races', {
		raceId : req.raceId
	});
});

module.exports = router;