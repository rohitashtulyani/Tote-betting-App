var config = require('../../config');
var dutil = require('./dividend-util');

function getExactaDividend(exactaBets, result, next){

	var matchCriteria = [];	
	matchCriteria.push(JSON.parse(result).first);
	matchCriteria.push(JSON.parse(result).second);
    var poolAmount = dutil.calculateTotalAmount(exactaBets);
    var correctsBets = filterBetsBasedOnSelections(exactaBets, matchCriteria);
    var correctsBetsAmount = dutil.calculateTotalAmount(correctsBets);
    next(null, dutil.getDividendAmount(poolAmount, correctsBetsAmount, config.commissions.exactaBet));
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