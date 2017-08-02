var fs = require('fs');
var config = require('../../config');
var dutil = require('./dividend-util');

function getWinDividend(bets, result, next){

	var firstRanker = JSON.parse(result).first;
    var poolAmount = dutil.calculateTotalAmount(bets);
    var stakeBets = dutil.filterListBasedOnSelections(bets, firstRanker);
    var stakeAmount = dutil.calculateTotalAmount(stakeBets);
    var dividentAmount = dutil.getDividendAmount(poolAmount, stakeAmount, config.commissions.winBet);
    next(null, dividentAmount);
}

module.exports = getWinDividend;