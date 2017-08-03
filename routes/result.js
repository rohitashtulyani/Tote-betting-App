var express  = require('express');
var router = express.Router();
var path = require('path');
var Result = require(path.join('../', 'app/result'));

router.param('raceId', function(req, res, next, raceId) {
    req.raceId = raceId;
    next()
 
});

router.get('/races/:raceId/result', function(req, res, next) {
  res.render('result', {
		title : "Result",
		raceId : req.raceId
	});
});

router.post('/races/:raceId/result', function(req, res, next) {
 Result.publish(req, function(err, resp){
			return res.render('result', {
				title : "Result",
				raceId : req.raceId
			});
		});
});

module.exports = router;