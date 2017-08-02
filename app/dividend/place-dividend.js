var config = require('../../config');
var dUtil = require('./dividend-util');

var content;
function getPlaceDividend(bets, result, next){

	var matchCriteria = [];	
	matchCriteria.push(JSON.parse(result).first);
	matchCriteria.push(JSON.parse(result).second);
	matchCriteria.push(JSON.parse(result).third);

    var poolAmount = dUtil.calculateTotalAmount(bets);
    var stakeBetsArray = getFilterArray(bets, matchCriteria);
    var stakeAmountArray = calculateTotalAmounts(stakeBetsArray);
    next(null, getDividendForAll(poolAmount, stakeAmountArray, config.commissions.placeBet));

}

function getFilterArray(list, matchCriteria){
	var stakeArray = {};
	stakeArray.first = dUtil.filterListBasedOnSelections(list, matchCriteria[0]);
	stakeArray.second = dUtil.filterListBasedOnSelections(list, matchCriteria[1]);
	stakeArray.third = dUtil.filterListBasedOnSelections(list, matchCriteria[2]);
	return stakeArray;
}

function calculateTotalAmounts(stakeBetsArray){
	var amountArray = [];
	amountArray.first = dUtil.calculateTotalAmount(stakeBetsArray.first);
	amountArray.second = dUtil.calculateTotalAmount(stakeBetsArray.second);
	amountArray.third = dUtil.calculateTotalAmount(stakeBetsArray.third);
	return amountArray;
}

function getDividendForAll(poolAmount, stakeAmountArray, commission){
	poolAmount = poolAmount/3;
	var dividentArray = [];
	dividentArray.first = dUtil.getDividendAmount(poolAmount, stakeAmountArray.first, commission);
	dividentArray.second = dUtil.getDividendAmount(poolAmount, stakeAmountArray.second, commission);
	dividentArray.third = dUtil.getDividendAmount(poolAmount, stakeAmountArray.third, commission);
	return dividentArray;
}

module.exports = getPlaceDividend;