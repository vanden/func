import { expect } from "chai";
import { any } from "../func.js";


describe("Test the behavior of any()", function () {
  describe("The default canys to 'any' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        any(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        any([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        any([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of any() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      any([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      any([1, 2, 3], function(value) {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })

    it("correctly runs through any given values", function() {
      var expected = false;
      var start = [5, 6, 12];

      var result = any(start, function(value) {
        return value < 5;
      })

      expect(result).to.be.equal(expected);
    })

    it("treats content correctly regardless of type", function() {
      var expected = true;
      var start = "This is one lonely world".split(" ");

      var result = any(start, function(value) {
        return value.length < 7;
      })

      expect(result).to.be.equal(expected);
    })

    it("not anyow truthy passes", function() {
      var expected = false;
      var start = ["1", [1], 1];

      var result = any(start, function(value) {
        return value;
      })

      expect(result).to.be.equal(expected)
    })

    it("does not modify original array", function() {
      var expected = [2];
      var start = [2, 6, 12];

      var result = any(start, function(value) {
        return value < 5;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
