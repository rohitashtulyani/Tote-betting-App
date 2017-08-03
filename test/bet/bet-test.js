var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
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
});