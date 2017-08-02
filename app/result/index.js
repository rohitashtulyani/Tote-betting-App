var fs = require('fs');
var path = require('path');

function Result(first, second, third){
	this.first = first;
	this.second = second;
	this.third = third;
}

Result.publish = function(body, next){
	var result = new Result(body.first, body.second, body.third);
	console.log("Writing result to results.txt :: ", result);
	fs.appendFile(path.join('./' , 'db/results.txt'), JSON.stringify(result)+"\n");
	next(null, result);
}

module.exports = Result;