var config = require('../../config');
var dUtil = require('./dividend-util');

var content;
function getPlaceDividend(placeBets, result, next){

	var matchCriteria = [];	
	matchCriteria.push(JSON.parse(result).first);
	matchCriteria.push(JSON.parse(result).second);
	matchCriteria.push(JSON.parse(result).third);

    var poolAmount = dUtil.calculateTotalAmount(placeBets);
    var correctBetsArray = getCorrectBets(placeBets, matchCriteria);
    var correctBetsAmountArray = getBetsTotalAmounts(correctBetsArray);
    next(null, getDividendForAllPlaces(poolAmount, correctBetsAmountArray, config.commissions.placeBet));

}

function getCorrectBets(placeBets, matchCriteria){
	var betArray = {};
	betArray.first = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[0]);
	betArray.second = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[1]);
	betArray.third = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[2]);
	return betArray;
}

function getBetsTotalAmounts(correctBetsAmountArray){
	var amountArray = [];
	amountArray.first = dUtil.calculateTotalAmount(correctBetsAmountArray.first);
	amountArray.second = dUtil.calculateTotalAmount(correctBetsAmountArray.second);
	amountArray.third = dUtil.calculateTotalAmount(correctBetsAmountArray.third);
	return amountArray;
}

function getDividendForAllPlaces(poolAmount, correctBetsAmountArray, commission){
	poolAmount = poolAmount/3;
	var dividentArray = [];
	dividentArray.first = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.first, commission);
	dividentArray.second = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.second, commission);
	dividentArray.third = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.third, commission);
	return dividentArray;
}

module.exports = getPlaceDividend;