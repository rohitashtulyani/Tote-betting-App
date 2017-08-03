var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var content;
function determineWiningStakes(betsList, results, next){
    var stackArray = {};
	var winStakeArray = [];
    var PlaceStackArray  = {
            first: [],
            second: [],
            third: []
        };
    var exactaStakeArray = [];
    console.log("results is :", results);
    _.forEach(betsList, function(bet){
    	if(bet != ''){
            switch (JSON.parse(bet).product) {
                case 'W':
                    calculateWinStake(bet, results, winStakeArray);
                    break;
                case 'P':
                    calculatePlaceStake(bet, results, PlaceStackArray);
                    break;
                case 'E':
                    calculateExactaStake(bet, results, exactaStakeArray);
            }
        }
    });
    console.log("winStakeArray is :", winStakeArray);
    console.log("PlaceStackArray is :", PlaceStackArray);
    stackArray.win = _.sum(winStakeArray);
    var place = {};
    place.first = _.sum(PlaceStackArray.first);
    place.second = _.sum(PlaceStackArray.second);
    place.third = _.sum(PlaceStackArray.third);
    stackArray.place = place;
    stackArray.exacta= _.sum(exactaStakeArray);
	console.log (stackArray);

    return stackArray;
}

function calculateWinStake(bet, results, winStakeArray){
    var firstRanker = JSON.parse(results).first;
    if(firstRanker == JSON.parse(bet).selections){
        console.log("in if");
        winStakeArray.push(_.parseInt(JSON.parse(bet).stake));
    }
}

function calculatePlaceStake(bet, results, PlaceStackArray){
    var firstRanker = JSON.parse(results).first;
    var secondRanker = JSON.parse(results).second;
    var thirdRanker = JSON.parse(results).third;
    if(firstRanker == JSON.parse(bet).selections){
        PlaceStackArray.first.push(_.parseInt(JSON.parse(bet).stake));
    }
    else if(secondRanker == JSON.parse(bet).selections){
         PlaceStackArray.second.push(_.parseInt(JSON.parse(bet).stake));
    } else if(thirdRanker == JSON.parse(bet).selections){ 
         PlaceStackArray.third.push(_.parseInt(JSON.parse(bet).stake));
    }
}

function calculateExactaStake(bet, results, exactaStakeArray){
    var firstRanker = JSON.parse(results).first;
    var secondeRanker = JSON.parse(results).second;

    var selections = (JSON.parse(bet).selections).split(",");
   // console.log("selections is ::", selections);
    if(firstRanker == selections[0] && secondeRanker == selections[1]){
        console.log("in if");
        exactaStakeArray.push(_.parseInt(JSON.parse(bet).stake));
    }
}

module.exports = determineWiningStakes;