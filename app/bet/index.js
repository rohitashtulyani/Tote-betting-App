'use strict';

var fs = require('fs');
var path = require('path');
var validator = require("./validator");

/**
 * Represents a Bet Class
 * @constructor
 * @param {String} product - represents product types(allowed are W, P or E)
 * @param {String} selections - represents horse no. for betting
 * @param {String} stake - represents amount in $
 */
function Bet(product, selections, stake){
	this.product = product;
	this.selections = selections;
	this.stake = stake;
}

/**
 * Bet Class - save method
 * This method is used for saving a bet in Bets file. If bet save successfully,
 * returns Bet object, otherwise return errors in next(err)
 * @method
 * @param {Object} req - represets json object with childs raceId and body
 * @param {Function} next - represents Calback function
 * @returns {Bet} bet - represents Bet object
 */
Bet.save = function(req, next){
	try{
		var raceId = req.raceId;
		var bet = new Bet(req.body.product, req.body.selections, req.body.stake);
		validator(bet, function(err, res){
			if(err){
				throw err;
			}
			var fileName = "bets_"+raceId+".txt";    // create file name based on RaceId
			fs.appendFileSync(path.join('./db/', fileName), JSON.stringify(bet)+"\n");
			next(null, bet);
		});
	}catch(err){
		next(err);
	}
}

module.exports = Bet;