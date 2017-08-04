'use strict';

var express  = require('express');
var router = express.Router();
var Dividend = require('../app/dividend');

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/races/:raceId/dividends', function(req, res, next) {
	Dividend.calculate(req, function(err, resp){
	 	if(err){
			next(err);
		}else{
			return res.render('dividend', {
				title : "Dividends",
				raceId : req.raceId,
				dividends : resp
			});
		}
	});
});

module.exports = router;