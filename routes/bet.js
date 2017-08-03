var express  = require('express');
var router = express.Router();
var path = require('path');
var Bet = require(path.join('../', 'app/bet'));

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/races/:raceId/bet', function(req, res, next) {
  res.render('bet', {
		title : "Bet",
		raceId : req.raceId
	});
});

router.post('/races/:raceId/bet', function(req, res, next) {
	Bet.make(req, function(err, resp){
			return res.render('bet', {
				title : "Bet",
				raceId : req.raceId
			});
		});
});

module.exports = router;