var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var assert = chai.assert;
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
    it("should give multiple errors", function(done) {
       Result.save({"body" : {"first":"","second":"","third":""}}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: First Ranker is Required.", err[0]);
            assert.equal("Error: Second Ranker is Required.", err[1]);
            assert.equal("Error: Third Ranker is Required.", err[2]);
            done();
        })
    });
});