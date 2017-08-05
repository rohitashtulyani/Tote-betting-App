'use strict';

var express  = require('express');
var router = express.Router();
var Bet = require('../app/bet');

// raceId set in req as param
router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

// get route
router.get('/races/:raceId/bets', function(req, res, next) {
  res.render('bets', {
		raceId : req.raceId
	});
});

// post route
router.post('/races/:raceId/bets', function(req, res, next) {
	Bet.save(req, function(err, resp){
		if(err){
			next(err);
		} else {
			return res.render('bets', {
				raceId : req.raceId
			});
		}
	});		
});

module.exports = router;