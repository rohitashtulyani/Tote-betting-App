var chai = require("chai")
chai.use(require('chai-things'));
var assert = chai.assert;
var wDividend = require('../../app/dividend/win-dividend');

var bets = [];
bets.push('{"product":"W","selections":"2","stake":"4"}');
bets.push('{"product":"W","selections":"3","stake":"5"}');
bets.push('{"product":"W","selections":"1","stake":"3"}');
bets.push('{"product":"W","selections":"4","stake":"5"}');
bets.push('{"product":"W","selections":"1","stake":"16"}');
bets.push('{"product":"W","selections":"2","stake":"8"}');
bets.push('{"product":"W","selections":"3","stake":"22"}');
bets.push('{"product":"W","selections":"4","stake":"57"}');
bets.push('{"product":"W","selections":"1","stake":"42"}');
bets.push('{"product":"W","selections":"2","stake":"98"}');
bets.push('{"product":"W","selections":"3","stake":"63"}');
bets.push('{"product":"W","selections":"4","stake":"15"}');

var result = '{"first":"2","second":"3","third":"1"}';

describe("Util", function() {
    it("should be calcualte divident amount", function(done) {
       wDividend(bets, result, function(err, dividendAmount){
          assert.equal(2.61, dividendAmount);
          done();
        })
    });
});