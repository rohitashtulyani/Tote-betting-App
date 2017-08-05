var chai = require("chai")
chai.use(require('chai-things'));
var assert = chai.assert;
var pDividend = require('../../app/dividend/place-dividend');

var bets = [];
bets.push('{"product":"P","selections":"1","stake":"31"}');
bets.push('{"product":"P","selections":"2","stake":"89"}');
bets.push('{"product":"P","selections":"3","stake":"28"}');
bets.push('{"product":"P","selections":"4","stake":"72"}');
bets.push('{"product":"P","selections":"1","stake":"40"}');
bets.push('{"product":"P","selections":"2","stake":"16"}');
bets.push('{"product":"P","selections":"3","stake":"82"}');
bets.push('{"product":"P","selections":"4","stake":"52"}');
bets.push('{"product":"P","selections":"1","stake":"18"}');
bets.push('{"product":"P","selections":"2","stake":"74"}');
bets.push('{"product":"P","selections":"3","stake":"39"}');
bets.push('{"product":"P","selections":"4","stake":"105"}');

var result = {}
result.first = "2" ;
result.second = "3" ;
result.third = "1";

describe("Place dividend", function() {
    it("should be calcualte", function(done) {
       pDividend(bets, result, function(err, dividendAmountArray){
          assert.equal(1.06, dividendAmountArray.first);
          assert.equal(1.27, dividendAmountArray.second);
          assert.equal(2.13, dividendAmountArray.third);
          done();
        })
    });
});