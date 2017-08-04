'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('../../config');
var dutil = require('./dividend-util');
var wDividend = require('./win-dividend');
var eDividend = require('./exacta-dividend');
var pDividend = require('./place-dividend');

function Dividend(product, winningSelections, dividend){
	this.product = product,
	this.winningSelections = winningSelections,
	this.amount = dividend
}

Dividend.calculate = function(req, next){
	try{
		var raceId = req.raceId;
		console.log("raceId is : ",raceId);
		var betsFile = "bets_"+raceId+".txt";
		var betsData = fs.readFileSync(path.join('./db/' +betsFile),'utf8');
		var bets =  betsData.split("\n");

		var resultsFile = "results_"+raceId+".txt";
		var resultData= fs.readFileSync(path.join('./db/' +resultsFile),'utf8');
		resultData = JSON.parse(resultData);

		var dividends = [];
		var winbets = dutil.filterBetsBasedOnProduct(bets, "W");
		var winDividendAmount = wDividend(winbets, resultData, function(err, winDividendAmount){
			dividends.push(new Dividend("Win", resultData.first, winDividendAmount));
		});

		var placebets = dutil.filterBetsBasedOnProduct(bets, "P");
		pDividend(placebets, resultData, function(err, placeDividendAmountArray){
			dividends.push(new Dividend("Place", resultData.first, placeDividendAmountArray.first));
			dividends.push(new Dividend("Place", resultData.second, placeDividendAmountArray.second));
			dividends.push(new Dividend("Place", resultData.third, placeDividendAmountArray.third));
		});
		
		var exactabets = dutil.filterBetsBasedOnProduct(bets, "E");
		eDividend(exactabets, resultData, function(err, exactaDividendAmount){
			dividends.push(new Dividend("Exacta", resultData.first+","+resultData.second, exactaDividendAmount));
		});
		 
		next(null, dividends);
	}catch(err){
		next(err);
	}
}



module.exports = Dividend;