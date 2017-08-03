var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var Race = require('../../app/race');

var req = {};

describe("Race", function() {
    it("should be started with Id", function(done) {
       Race.start(req, function(err, resp){
            expect(resp.raceId).to.be.ok;
            done();
        })
    });
});