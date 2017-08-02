var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('../../config');
var wDividend = require('./win-dividend');
var eDividend = require('./exacta-dividend');
var pDividend = require('./place-dividend');

function Dividend(product, winningSelections, dividend){
	this.product = product,
	this.winningSelections = winningSelections,
	this.amount = dividend
}

Dividend.calculate = function(body, next){
	var bets = fs.readFileSync(path.join('./' , 'db/bets.txt'),'utf8');
	var betsList =  bets.split("\n");
	var results = fs.readFileSync(path.join('./' , 'db/results.txt'),'utf8');
	var firstRanker = JSON.parse(results).first;
	var secondRanker = JSON.parse(results).second;
	var thirdRanker = JSON.parse(results).third;

	var dividends = [];
	var winbets = filterListBasedOnProduct(betsList, "W");
	var winDividendAmount = wDividend(winbets, results, function(err, winDividendAmount){
		dividends.push(new Dividend("Win", firstRanker, winDividendAmount));
	});

	var placebets = filterListBasedOnProduct(betsList, "P");
	pDividend(placebets, results, function(err, placeDividendAmountArray){
		dividends.push(new Dividend("Place", firstRanker, placeDividendAmountArray.first));
		dividends.push(new Dividend("Place", secondRanker, placeDividendAmountArray.second));
		dividends.push(new Dividend("Place", thirdRanker, placeDividendAmountArray.third));
	});
	
	var exactabets = filterListBasedOnProduct(betsList, "E");
	eDividend(exactabets, results, function(err, exactaDividendAmount){
		dividends.push(new Dividend("Exacta", firstRanker+","+secondRanker, exactaDividendAmount));
	});
	 
	next(null, dividends);
}

function filterListBasedOnProduct(list, matchCriteria){
	return list.filter(function(obj){
		if(obj && matchCriteria){
			return matchCriteria === JSON.parse(obj).product;
		}
	})
}

module.exports = Dividend;