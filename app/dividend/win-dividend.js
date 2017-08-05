'use strict';

var fs = require('fs');
var config = require('../../config');
var dutil = require('./dividend-util');

/**
 * getWinDivident method
 * This method is used for getitng win bet dividend amount.
 * @method
 * @param {String[]} winBets - represets all win type bets on race
 * @param {String} result - represents race result
 * @param {Function} callback - represents Callback function
 * @returns {String[]} winDividends - represents win dividend amount
 */
function getWinDividend(winBets, result, next){
	try{
		var matchCriteria = result.first;
	    var poolAmount = dutil.calculateTotalAmount(winBets);
	    var correctBets = dutil.filterBetsBasedOnSelections(winBets, matchCriteria);
	    var correctBetsAmount = dutil.calculateTotalAmount(correctBets);
	    var dividentAmount = dutil.getDividendAmount(poolAmount, correctBetsAmount, config.commissions.winBet);
	    next(null, dividentAmount);
	}catch(err){
		next(err);
	}
}

module.exports = getWinDividend;