var express  = require('express');
var router = express.Router();
var path = require('path');
var Dividend = require(path.join("../", 'app/dividend'));

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/races/:raceId/dividends', function(req, res, next) {
 Dividend.calculate(req, function(err, resp){
			return res.render('dividend', {
				title : "Dividends",
				raceId : req.raceId,
				dividends : resp
			});
		});
});

module.exports = router;