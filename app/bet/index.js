'use strict';

var fs = require('fs');
var path = require('path');
var validator = require("./validator");

function Bet(product, selections, stake){
	this.product = product;
	this.selections = selections;
	this.stake = stake;
}

Bet.save = function(req, next){
	try{
		var raceId = req.raceId;
		var bet = new Bet(req.body.product, req.body.selections, req.body.stake);
		validator(bet, function(err, res){
			if(err){
				console.log("err :: ", err);
				throw err;
			}
			console.log("__dir :: ", __dirname);
				console.log("__filename :: ", __filename);
			console.log("Writing bet to bets.txt :: ", bet);
			var fileName = "bets_"+raceId+".txt";
			fs.appendFileSync(path.join('./db/', fileName), JSON.stringify(bet)+"\n");
			next(null, bet);
		});
	}catch(err){
		next(err);
	}
}

module.exports = Bet;