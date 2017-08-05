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

/**
 * Represents a Dividend Class
 * @constructor
 * @param {String} product - represents product types(allowed are W, P or E)
 * @param {String} winningSelections - represents winning horse no based on bet type
 * @param {String} dividend - represents dividend amount based on bet type
 */
function Dividend(product, winningSelections, dividend){
	this.product = product,
	this.winningSelections = winningSelections,
	this.amount = dividend
}

/**
 * Dividend Class - calculate method
 * This method is used for calculating dividend amounts for all bet types.
 * If dividend calculated successfully returns Dividend object and call next(), 
 * otherwise return errors in next(err)
 * @methos
 * @param {Object} req - represets json object with childs raceId and body
 * @param {Function} next - represents Calback function
 * @returns {Dividend} dividends - represents dividends list based on bet types
 */
Dividend.calculate = function(req, next){
	try{
		var raceId = req.raceId;
		var betsFile = "bets_"+raceId+".txt";
		// Read bets details from file.
		var betsData = fs.readFileSync(path.join('./db/' +betsFile),'utf8');
		var bets =  betsData.split("\n");

		var resultsFile = "results_"+raceId+".txt";
		// Read result details from file.
		var resultData= fs.readFileSync(path.join('./db/' +resultsFile),'utf8');
		resultData = JSON.parse(resultData);

		// Created Promises for getting different dividends
		var dividentPromises = [];  
		dividentPromises.push(getWinDivident(bets, resultData));
		dividentPromises.push(getPlaceDivident(bets, resultData));
		dividentPromises.push(getExactaDivident(bets, resultData));

		Promise.all(dividentPromises)
		.then(function(dividends){
			next(null, dividends);
		})
	}catch(err){
		next(err);
	}
}

/**
 * getWinDivident method
 * This method is used for getitng win bet dividends. It will filter all win bets 
 * and calls getWinDividend function of win-divident.js
 * @method
 * @param {String[]} bets - represets all bets on race
 * @param {String} resultData - represents race result
 * @returns {Dividend[]} winDividends - represents win dividends
 */
function getWinDivident(bets, resultData){
	var winbets = dutil.filterBetsBasedOnProduct(bets, "W");
	return Promise.promisify(wDividend)(winbets, resultData)
			.then(function(winDividendAmount){
				var winDividends = [];
				winDividends.push(new Dividend("Win", resultData.first, winDividendAmount));
				return winDividends;
			});
}

/**
 * getPlaceDivident method
 * This method is used for getitng place bet dividends. It will filter all place bets 
 * and calls getPalceDividend function of place-divident.js
 * @method
 * @param {String[]} bets - represets all bets on race
 * @param {String} resultData - represents race result
 * @returns {Dividend[]} placeDividends - represents place dividends
 */
function getPlaceDivident(bets, resultData){
	var placebets = dutil.filterBetsBasedOnProduct(bets, "P");
	return Promise.promisify(pDividend)(placebets, resultData)
			.then(function(placeDividendAmountArray){
				var placeDividends = [];
				placeDividends.push(new Dividend("Place", resultData.first, placeDividendAmountArray.first));
				placeDividends.push(new Dividend("Place", resultData.second, placeDividendAmountArray.second));
				placeDividends.push(new Dividend("Place", resultData.third, placeDividendAmountArray.third));
				return placeDividends
			});
}

/**
 * getExactaDivident method
 * This method is used for getitng place exacta dividends. It will filter all exacta bets 
 * and calls getExactaDivident function of exacta-divident.js
 * @method
 * @param {String[]} bets - represets all bets on race
 * @param {String} resultData - represents race result
 * @returns {Dividend[]} exactaDividents - represents exacta dividends
 */
function getExactaDivident(bets, resultData){
	var exactabets = dutil.filterBetsBasedOnProduct(bets, "E");
	return Promise.promisify(eDividend)(exactabets, resultData)
			.then(function(exactaDividendAmount){
				var exactaDividents = [];
				exactaDividents.push(new Dividend("Exacta", resultData.first+","+resultData.second, exactaDividendAmount));
				return exactaDividents;
			});
}


module.exports = Dividend;