var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var Result = require('../../app/result');

var req = {
    "raceId": "1",
    "body": {
        "first": "1",
        "second": "2",
        "third": "3"
    }
}

describe("Results", function() {
    it("should be saved", function(done) {
       Result.save(req, function(err, resp){
            expect(resp.first).to.be.ok;
            done();
        })
    });
});