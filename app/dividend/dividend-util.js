'use strict';

var _ = require('lodash');

module.exports = {

	/**
	 * calculateTotalAmount method
	 * This method is used for calculating total amount based on bets
	 * @method
	 * @param {String[]} bets - represets all bets on race
	 * @returns {Number} totalAmount - represents total amount
	 */
	calculateTotalAmount : function(bets){
		var totalAmount = 0 ;
		return bets.reduce(function(totalAmount, bet){
			return totalAmount + _.parseInt(JSON.parse(bet).stake);
		}, 0);
	},

	/**
	 * filterBetsBasedOnSelections method
	 * This method is used for filtering bets based on selections and match criteria
	 * @method
	 * @param {String[]} bets - represets all bets on race
	 * @param {String} matchCriteria - represets match criteria
	 * @returns {String[]} filterdBets - represets filtered bets list
	 */
	filterBetsBasedOnSelections : function(bets, matchCriteria){
		return bets.filter(function(bet){
			if(bet && matchCriteria){
				return matchCriteria === JSON.parse(bet).selections;
			}
		})
	},

	/**
	 * filterBetsBasedOnProduct method
	 * This method is used for filtering bets based on product and match criteria
	 * @method
	 * @param {String[]} bets - represets all bets on race
	 * @param {String} matchCriteria - represets match criteria
	 * @returns {String[]} filterdBets - represets filtered bets list
	 */
	filterBetsBasedOnProduct : function(bets, matchCriteria){
		return bets.filter(function(bet){
			if(bet && matchCriteria){
				return matchCriteria === JSON.parse(bet).product;
			}
		})
	},

	/**
	 * getDividendAmount method
	 * This method is used for calculating dividend amount based on 
	 * pool amount, winning bet stack amount and commision
	 * @method
	 * @param {String} poolAmount - represets total amount of bets
	 * @param {String} correctBetsAmount - represets total amount of correct bets
	 * @param {String} commission - represets commission of bet type
	 * @returns {Number} dividedAmount - represents dividend amount
	 */
	getDividendAmount : function (poolAmount, correctBetsAmount, commission){
		var afterCommissionAmount = _.multiply(poolAmount, (1 - commission));
		return correctBetsAmount ? _.round(_.divide(afterCommissionAmount, correctBetsAmount), 2) : 0;
	}
}