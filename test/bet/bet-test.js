var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var assert = chai.assert;
var Bet = require('../../app/bet');

var req = {
    "raceId": "1",
    "body": {
        "product": "W",
        "selections": "1",
        "stake": "3"
    }
}

describe("Bets", function() {
    it("should be saved", function(done) {
       Bet.save(req, function(err, resp){
            expect(resp.product).to.be.ok;
            done();
        })
    });
    it("should give multiple errors", function(done) {
       Bet.save({"body" : {"product":"","selections":"","stake":""}}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Product is Required.", err[0]);
            assert.equal("Error: Selections is Required.", err[1]);
            assert.equal("Error: Stake is Required.", err[2]);
            done();
        })
    });
});