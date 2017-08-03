var fs = require('fs');
var path = require('path');

function Bet(product, selections, stake){
	this.product = product;
	this.selections = selections;
	this.stake = stake;
}

Bet.make = function(req, next){
	
	var raceId = req.raceId;
	console.log("raceId is : ",raceId);
	var bet = new Bet(req.body.product, req.body.selections, req.body.stake);
	console.log("Writing bet to bets.txt :: ", bet);
	var fileName = "bets_"+raceId+".txt";
	fs.appendFile(path.join('./db/', fileName), JSON.stringify(bet)+"\n");
	next(null, bet);
}

module.exports = Bet;