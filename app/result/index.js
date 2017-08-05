'use strict';

var fs = require('fs');
var path = require('path');
var validator = require("./validator");

/**
 * Represents a Result Class
 * @constructor
 * @param {String} first - represents horse no who came first
 * @param {String} second - represents horse no who came second
 * @param {String} stake - represents horse no who came third
 */
function Result(first, second, third){
	this.first = first;
	this.second = second;
	this.third = third;
}

/**
 * Result Class - save method
 * This method is used for saving a result in Result file. If result save successfully,
 * returns Result object, otherwise return errors in next(err)
 * @method
 * @param {Object} req - represets json object with childs raceId and body
 * @param {Function} next - represents Calback function
 * @returns {Result} result - represents Result object
 */
Result.save = function(req, next){
	try{
		var raceId = req.raceId;
		var result = new Result(req.body.first, req.body.second, req.body.third);
		validator(result, function(err, res){
			if(err){
				throw err;
			}
			var fileName = "results_"+raceId+".txt";  // create file name based on RaceId
			fs.writeFileSync(path.join('./db/', fileName), JSON.stringify(result));
			next(null, result);
		});
	}catch(err){
		next(err);
	}
}

module.exports = Result;