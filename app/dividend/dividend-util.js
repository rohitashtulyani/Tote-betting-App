'use strict';

var _ = require('lodash');

module.exports = {

	calculateTotalAmount : function(bets){
		var totalAmount = 0 ;
		return bets.reduce(function(totalAmount, bet){
			return totalAmount + _.parseInt(JSON.parse(bet).stake);
		}, 0);
	},
	filterBetsBasedOnSelections : function(bets, matchCriteria){
		return bets.filter(function(bet){
			if(bet && matchCriteria){
				return matchCriteria === JSON.parse(bet).selections;
			}
		})
	},
	filterBetsBasedOnProduct : function(bets, matchCriteria){
		return bets.filter(function(bet){
			if(bet && matchCriteria){
				return matchCriteria === JSON.parse(bet).product;
			}
		})
	},
	getDividendAmount : function (poolAmount, correctBetsAmount, commission){
	var afterCommissionAmount = _.multiply(poolAmount, (1 - commission));
	return correctBetsAmount ? _.round(_.divide(afterCommissionAmount, correctBetsAmount), 2) : 0;
}
}