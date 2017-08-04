'use strict';

var config = require('../../config');
var dutil = require('./dividend-util');

function getExactaDividend(exactaBets, result, next){
	try{
		var matchCriteria = [];	
		matchCriteria.push(result.first);
		matchCriteria.push(result.second);
	    var poolAmount = dutil.calculateTotalAmount(exactaBets);
	    var correctsBets = filterBetsBasedOnSelections(exactaBets, matchCriteria);
	    var correctsBetsAmount = dutil.calculateTotalAmount(correctsBets);
	    next(null, dutil.getDividendAmount(poolAmount, correctsBetsAmount, config.commissions.exactaBet));
	}catch(err){
		next(err);
	}
}

function filterBetsBasedOnSelections(bets, matchCriteria){
	return bets.filter(function(bet){
		if(bet && matchCriteria){
			var selections = (JSON.parse(bet).selections).split(",");
			return matchCriteria[0] === selections[0] && matchCriteria[1] == selections[1];
		}
	})
}

module.exports = getExactaDividend;