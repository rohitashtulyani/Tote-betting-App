var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var assert = chai.assert;
var Dividend = require('../../app/dividend');

var req = {
    "raceId": "test"
}

describe("Dividends calculation", function() {
    it("Win dividend should be calculate", function(done) {
       Dividend.calculate(req, function(err, dividends){
            expect(dividends).to.be.ok;
            assert.equal(1, dividends[0].length);
            assert.equal(2.61, dividends[0][0].amount);
            done();
        })
    });
    it("Place dividend should be calculate", function(done) {
       Dividend.calculate(req, function(err, dividends){
            expect(dividends).to.be.ok;
            assert.equal(3, dividends[1].length);
            assert.equal(1.06, dividends[1][0].amount);
            assert.equal(1.27, dividends[1][1].amount);
            assert.equal(2.13, dividends[1][2].amount);
            done();
        })
    });
    it("Exacta dividend should be calculate", function(done) {
       Dividend.calculate(req, function(err, dividends){
            expect(dividends).to.be.ok;
            assert.equal(1, dividends[2].length);
            assert.equal(2.43, dividends[2][0].amount);
            done();
        })
    });
});