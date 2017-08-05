'use strict';

var express  = require('express');
var router = express.Router();
var Result = require('../app/result');

// raceId set in req as param
router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

// get route
router.get('/races/:raceId/results', function(req, res, next) {
  res.render('results', {
		raceId : req.raceId
	});
});

//post route
router.post('/races/:raceId/results', function(req, res, next) {
 		Result.save(req, function(err, resp){
 			if(err){
				next(err);
			}else{
				return res.render('results', {
					raceId : req.raceId
				});
			}
		});
});

module.exports = router;