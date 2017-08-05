'use strict';

var config = require('../../config');
var dUtil = require('./dividend-util');

/**
 * getPlaceDividend method
 * This method is used for getting place bet dividend amount.
 * @method
 * @param {String[]} placeBets - represets all place type bets on race
 * @param {String} result - represents race result
 * @param {Function} callback - represents Callback function
 * @returns {String[]} placeDividends - represents place dividend amount
 */
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

/**
 * getCorrectBets method
 * This method is used for getitng corrects bets list based on place bet types.
 * @method
 * @param {String[]} placeBets - represets all place type bets on race
 * @param {String[]} matchCriteria - represents match criteria list
 * @returns {String[]} betsLists - represents bets list
 */
function getCorrectBets(placeBets, matchCriteria){
	var betsLists = {};
	betsLists.first = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[0]);
	betsLists.second = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[1]);
	betsLists.third = dUtil.filterBetsBasedOnSelections(placeBets, matchCriteria[2]);
	return betsLists;
}

/**
 * getBetsTotalAmounts method
 * This method is used for getting total amount list based on place bet types
 * @method
 * @param {String[]} correctBetsAmounts - represets bet amount list
 * @returns {String[]} amounts - represents total amount
 */
function getBetsTotalAmounts(correctBetsAmounts){
	var amounts = [];
	amounts.first = dUtil.calculateTotalAmount(correctBetsAmounts.first);
	amounts.second = dUtil.calculateTotalAmount(correctBetsAmounts.second);
	amounts.third = dUtil.calculateTotalAmount(correctBetsAmounts.third);
	return amounts;
}

/**
 * getDividendForAllPlaces method
 * This method is used for getting dividend amount list based on place bet types
 * @method
 * @param {String} poolAmount - represets total amount of bets
 * @param {String} correctBetsAmounts - represets total amount list of correct bets
 * @param {String} commission - represets commission of exacta bet type
 * @returns {Number[]} dividedAmount - represents dividend amount list
 */
function getDividendForAllPlaces(poolAmount, correctBetsAmounts, commission){
	poolAmount = poolAmount/3;
	var dividentAmounts = [];
	dividentAmounts.first = dUtil.getDividendAmount(poolAmount, correctBetsAmounts.first, commission);
	dividentAmounts.second = dUtil.getDividendAmount(poolAmount, correctBetsAmounts.second, commission);
	dividentAmounts.third = dUtil.getDividendAmount(poolAmount, correctBetsAmounts.third, commission);
	return dividentAmounts;
}

module.exports = getPlaceDividend;