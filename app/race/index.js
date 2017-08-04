'use strict';

var uuid = require('uuid');

function Race(raceId){
	this.raceId = raceId;
}

Race.start = function(body, next){
	try{
		var raceId = uuid.v4();
		var race = new Race(raceId);
		console.log("race :: ", race);
		next(null, race);
	}catch(err){
		next(err);
	}
}

module.exports = Race;