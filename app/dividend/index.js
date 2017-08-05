'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('../../config');
var dutil = require('./dividend-util');
var wDividend = require('./win-dividend');
var eDividend = require('./exacta-dividend');
var pDividend = require('./place-dividend');
var Promise = require('bluebird');

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

		var dividentPromises = [];
		dividentPromises.push(getWinDivident(bets, resultData));
		dividentPromises.push(getPlaceDivident(bets, resultData));
		dividentPromises.push(getExactaDivident(bets, resultData));

		Promise.all(dividentPromises)
		.then(function(dividends){
			console.log("dividends is :: ", dividends);
			next(null, dividends);
		})
	}catch(err){
		next(err);
	}
}

function getWinDivident(bets, resultData){
	var winbets = dutil.filterBetsBasedOnProduct(bets, "W");
	return Promise.promisify(wDividend)(winbets, resultData)
			.then(function(winDividendAmount){
				console.log("winDividendAmount is :: ", winDividendAmount);
				var winDividends = [];
				winDividends.push(new Dividend("Win", resultData.first, winDividendAmount));
				console.log("winDividends is :: ", winDividends);
				return winDividends;
			});
}

function getPlaceDivident(bets, resultData){
	var placebets = dutil.filterBetsBasedOnProduct(bets, "P");
	return Promise.promisify(pDividend)(placebets, resultData)
			.then(function(placeDividendAmountArray){
				var placeDividends = [];
				placeDividends.push(new Dividend("Place", resultData.first, placeDividendAmountArray.first));
				placeDividends.push(new Dividend("Place", resultData.second, placeDividendAmountArray.second));
				placeDividends.push(new Dividend("Place", resultData.third, placeDividendAmountArray.third));
				console.log("placeDividends is :: ", placeDividends);
				return placeDividends
			});
}

function getExactaDivident(bets, resultData){
	var exactabets = dutil.filterBetsBasedOnProduct(bets, "E");
	return Promise.promisify(eDividend)(exactabets, resultData)
			.then(function(exactaDividendAmount){
				var exactaDividents = [];
				exactaDividents.push(new Dividend("Exacta", resultData.first+","+resultData.second, exactaDividendAmount));
				console.log("exactaDividents is :: ", exactaDividents);
				return exactaDividents;
			});
}


module.exports = Dividend;