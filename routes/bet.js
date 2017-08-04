'use strict';

var express  = require('express');
var router = express.Router();
var path = require('path');
var Bet = require(path.join('../', 'app/bet'));

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/races/:raceId/bets', function(req, res, next) {
  res.render('bet', {
		title : "Bet",
		raceId : req.raceId
	});
});

router.post('/races/:raceId/bets', function(req, res, next) {
	Bet.save(req, function(err, resp){
		if(err){
			next(err);
		} else {
			return res.render('bet', {
				title : "Bet",
				raceId : req.raceId
			});
		}
	});		
});

module.exports = router;