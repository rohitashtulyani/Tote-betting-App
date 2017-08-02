var config = require('../../config');
var dutil = require('./dividend-util');

function getExactaDividend(bets, result, next){

	var matchCriteria = [];	
	matchCriteria.push(JSON.parse(result).first);
	matchCriteria.push(JSON.parse(result).second);
    var poolAmount = dutil.calculateTotalAmount(bets);
    var stakeBets = filterListBasedOnSelections(bets, matchCriteria);
    var stakeAmount = dutil.calculateTotalAmount(stakeBets);
    next(null, dutil.getDividendAmount(poolAmount, stakeAmount, config.commissions.exactaBet));
}

function filterListBasedOnSelections(list, matchCriteria){
	return list.filter(function(obj){
		var selections = (JSON.parse(obj).selections).split(",");
		if(obj && matchCriteria){
			return matchCriteria[0] === selections[0] && matchCriteria[1] == selections[1];
		}
	})
}

module.exports = getExactaDividend;