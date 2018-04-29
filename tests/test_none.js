import { expect } from "chai";
import { none } from "../func.js";


describe("Test the behavior of none()", function () {
  describe("The default cnones to 'none' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        none(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        none([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        none([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of none() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      none([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      none([1, 2, 3], function(value) {
        tick += 1;
        return false;
      })

      expect(tick).to.be.equal(3);
    })

    it("correctly runs through none given values", function() {
      var expected = false;
      var start = [2, 6, 12];

      var result = none(start, function(value) {
        return value < 5;
      })

      expect(result).to.be.equal(expected);
    })

    it("treats content correctly regardless of type", function() {
      var expected = true;
      var start = "This is one lonely world".split(" ");

      var result = none(start, function(value) {
        return value.length < 2;
      })

      expect(result).to.be.equal(expected);
    })

    it("not allow truthy passes", function() {
      var expected = false;
      var start = ["1", [1], 1];

      var result = none(start, function(value) {
        return value;
      })

      expect(result).to.be.equal(expected)
    })

    it("does not modify original array", function() {
      var expected = [2];
      var start = [2, 6, 12];

      var result = none(start, function(value) {
        return value < 5;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
