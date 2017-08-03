var chai = require("chai")
chai.use(require('chai-things'));
var assert = chai.assert;
var eDividend = require('../../app/dividend/exacta-dividend');

var bets = [];
bets.push('{"product":"E","selections":"1,2","stake":"13"}');
bets.push('{"product":"E","selections":"2,3","stake":"98"}');
bets.push('{"product":"E","selections":"1,3","stake":"82"}');
bets.push('{"product":"E","selections":"3,2","stake":"27"}');
bets.push('{"product":"E","selections":"1,2","stake":"5"}');
bets.push('{"product":"E","selections":"2,3","stake":"61"}');
bets.push('{"product":"E","selections":"1,3","stake":"28"}');
bets.push('{"product":"E","selections":"3,2","stake":"25"}');
bets.push('{"product":"E","selections":"1,2","stake":"81"}');
bets.push('{"product":"E","selections":"2,3","stake":"47"}');
bets.push('{"product":"E","selections":"1,3","stake":"93"}');
bets.push('{"product":"E","selections":"3,2","stake":"51"}');

var result = '{"first":"2","second":"3","third":"1"}';

describe("Util", function() {
    it("should be calcualte dividend", function(done) {
       eDividend(bets, result, function(err, dividendAmount){
          assert.equal(2.43, dividendAmount);
          done();
        })
    });
});