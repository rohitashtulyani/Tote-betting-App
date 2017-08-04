'use strict';

var config = require('../../config');
var dUtil = require('./dividend-util');

var content;
function getPlaceDividend(placeBets, result, next){
	try{
		var matchCriteria = [];	
		matchCriteria.push(result.first);
		matchCriteria.push(result.second);
		matchCriteria.push(result.third);

	    var poolAmount = dUtil.calculateTotalAmount(placeBets);
	    var correctBetsLists = getCorrectBets(placeBets, matchCriteria);
	    var correctBetsAmounts = getBetsTotalAmounts(correctBetsLists);
		
		next(null, getDividendForAllPlaces(poolAmount, correctBetsAmounts, config.commissions.placeBet));

	}catch(err){
		next(err);
	}
}

function getCorrectBets(placeBets, matchCriteria){
	var betsLists = {};
	betsLists.first = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[0]);
	betsLists.second = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[1]);
	betsLists.third = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[2]);
	return betsLists;
}

function getBetsTotalAmounts(correctBetsAmountArray){
	var amounts = [];
	amounts.first = dUtil.calculateTotalAmount(correctBetsAmountArray.first);
	amounts.second = dUtil.calculateTotalAmount(correctBetsAmountArray.second);
	amounts.third = dUtil.calculateTotalAmount(correctBetsAmountArray.third);
	return amounts;
}

function getDividendForAllPlaces(poolAmount, correctBetsAmountArray, commission){
	poolAmount = poolAmount/3;
	var dividentAmounts = [];
	dividentAmounts.first = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.first, commission);
	dividentAmounts.second = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.second, commission);
	dividentAmounts.third = dUtil.getDividendAmount(poolAmount, correctBetsAmountArray.third, commission);
	return dividentAmounts;
}

module.exports = getPlaceDividend;