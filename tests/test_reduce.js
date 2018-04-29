import { expect } from "chai";
import { reduce } from "../func.js";


describe("Test the behavior of reduce()", function () {
  describe("The default calls to 'reduce' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        reduce(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        reduce([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        reduce([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of reduce() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      reduce([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("reduces through all given values", function() {
      var expected = 6;
      var start = [1, 2, 3];

      var result = reduce(start, function(total, curr) {
        return total * curr;
      })

      expect(result).to.be.equal(expected);
    })

    it("reduces through all given values and initial", function() {
      var expected = 24;
      var start = [1, 2, 3];

      var result = reduce(start, function(total, curr) {
        return total * curr;
      }, 4)

      expect(result).to.be.equal(expected);
    })

    it("reduces through other types not just numbers", function() {
      var expected = "hello!";
      var start = ["e", "l", "l", "o", "!"];

      var result = reduce(start, function(total, curr) {
        return total + curr;
      }, "h")

      expect(result).to.be.equal(expected);
    })

    it("does not modify original array", function() {
      var expected = [1, 4, 9];
      var start = [1, 2, 3];

      var result = reduce([1, 2, 3], function(value) {
        return value * value;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
