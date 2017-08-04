'use strict';

var fs = require('fs');
var path = require('path');

function Result(first, second, third){
	this.first = first;
	this.second = second;
	this.third = third;
}

Result.save = function(req, next){
	try{
		var raceId = req.raceId;
		console.log("raceId is : ",raceId);
		var result = new Result(req.body.first, req.body.second, req.body.third);
		console.log("Writing result to results.txt :: ", result);
		var fileName = "results_"+raceId+".txt";
		fs.appendFileSync(path.join('./db/', fileName), JSON.stringify(result));
		next(null, result);
	}catch(err){
		next(err);
	}
}

module.exports = Result;