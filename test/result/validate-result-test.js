var chai = require("chai")
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var assert = chai.assert;
var validator = require('../../app/result/validator');


describe("Results Validation", function() {
    it("should give error - First Ranker is Required", function(done) {
       validator({"first":"","second":"3","third":"1"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: First Ranker is Required.", err[0]);
            done();
        })
    });
    it("should give error - First Ranker should be a number.", function(done) {
       validator({"first":"q","second":"3","third":"1"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: First Ranker should be a number.", err[0]);
            done();
        })
    });
    it("should give error - Second Ranker is Required", function(done) {
       validator({"first":"2","second":"","third":"1"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Second Ranker is Required.", err[0]);
            done();
        })
    });
    it("should give error - Second Ranker should be a number.", function(done) {
       validator({"first":"2","second":"a","third":"1"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Second Ranker should be a number.", err[0]);
            done();
        })
    });
    it("should give error - Third Ranker is Required", function(done) {
       validator({"first":"2","second":"3","third":""}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Third Ranker is Required.", err[0]);
            done();
        })
    });
    it("should give error - Third Ranker should be a number.", function(done) {
       validator({"first":"2","second":"3","third":"q"}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: Third Ranker should be a number.", err[0]);
            done();
        })
    });
    it("should give multiple errors", function(done) {
       validator({"first":"","second":"","third":""}, function(err, resp){
            expect(err).to.be.ok;
            assert.equal("Error: First Ranker is Required.", err[0]);
            assert.equal("Error: Second Ranker is Required.", err[1]);
            assert.equal("Error: Third Ranker is Required.", err[2]);
            done();
        })
    });
});