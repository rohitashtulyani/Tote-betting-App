'use strict';

var uuid = require('uuid');

/**
 * Represents a Race Class
 * @constructor
 * @param {String} raceId  - represent ongoing race no.
 */
function Race(raceId){
	this.raceId = raceId;
}

/**
 * Race Class - start method
 * This method is used for saving a bet in Bets file.
 * @method
 * @param {Object} req
 * @param {Function} next - Calback
 * @returns {Race} race - Race object
 */
Race.start = function(body, next){
	try{
		var raceId = uuid.v4();   // uuid generator
		var race = new Race(raceId);
		next(null, race);
	}catch(err){
		next(err);
	}
}

module.exports = Race;