var _ = require('lodash');

module.exports = {

	calculateTotalAmount : function(bets){
		var totalAmount = 0 ;
		return bets.reduce(function(totalAmount, bet){
			return totalAmount + _.parseInt(JSON.parse(bet).stake);
		}, 0);
	},
	filterListBasedOnSelections : function(list, matchCriteria){
		return list.filter(function(obj){
			if(obj && matchCriteria){
				return matchCriteria === JSON.parse(obj).selections;
			}
		})
	},
	getDividendAmount : function (poolAmount, stakeAmount, commission){
	var afterCommissionAmount = _.multiply(poolAmount, (1 - commission));
	return stakeAmount ? _.round(_.divide(afterCommissionAmount, stakeAmount), 2) : 0;
}
}