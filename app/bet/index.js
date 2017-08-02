var fs = require('fs');
var path = require('path');

function Bet(product, selections, stake){
	this.product = product;
	this.selections = selections;
	this.stake = stake;
}

Bet.make = function(body, next){
	var bet = new Bet(body.product, body.selections, body.stake);
	console.log("Writing bet to bets.txt :: ", bet);
	fs.appendFile(path.join('./' , 'db/bets.txt'), JSON.stringify(bet)+"\n");
	next(null, bet);
}

module.exports = Bet;