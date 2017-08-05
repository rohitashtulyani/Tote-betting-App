var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var assert = chai.assert;
var validator = require('../../app/bet/validator');


describe("Bets Validation", function() {
    it("should give error - Product is Required", function(done) {
       validator({"product":"","selections":"1","stake":"3"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Product is Required.", err[0]);
            done();
        })
    });
    it("should give error - Select Product from W, P or E.", function(done) {
       validator({"product":"L","selections":"1","stake":"3"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Select Product from W, P or E.", err[0]);
            done();
        })
    });
    it("should give error - Selections is Required.", function(done) {
       validator({"product":"W","selections":"","stake":"3"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Selections is Required.", err[0]);
            done();
        })
    });
    it("should give error - Selections should be a number format.", function(done) {
       validator({"product":"W","selections":"1,2","stake":"3"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Selections should be a number format.", err[0]);
            done();
        })
    });
    it("should give error - Exacta bet selections should be <number>,<number> format.", function(done) {
       validator({"product":"E","selections":"1","stake":"30"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Exacta bet selections should be <number>,<number> format.", err[0]);
            done();
        })
    });
    it("should give error - Stake is Required.", function(done) {
       validator({"product":"W","selections":"1","stake":""}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Stake is Required.", err[0]);
            done();
        })
    });
    it("should give error - Stake amount should be a number.", function(done) {
      validator({"product":"W","selections":"1","stake":"1q"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Stake amount should be a number.", err[0]);
            done();
        })
    });
    it("should give multiple errors", function(done) {
       validator({"product":"","selections":"","stake":""}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Product is Required.", err[0]);
            assert.equal("Error: Selections is Required.", err[1]);
            assert.equal("Error: Stake is Required.", err[2]);
            done();
        })
    });
});