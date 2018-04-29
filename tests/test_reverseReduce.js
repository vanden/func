import { expect } from "chai";
import { reverseReduce } from "../func.js";


describe("Test the behavior of reverseReduce()", function () {
  describe("The default calls to 'reverseReduce' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        reverseReduce(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        reverseReduce([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        reverseReduce([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of reverseReduce() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      reverseReduce([], function(total, curr) {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      reverseReduce([1, 2, 3], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(2);
    })

    it("reverseReduces through all given values", function() {
      var expected = 1;
      var start = [2, 3, 6];

      var result = reverseReduce(start, function(total, curr) {
        return total / curr;
      })

      expect(result).to.be.equal(expected);
    })

    it("reverseReduces through all given values and initial", function() {
      var expected = 24;
      var start = [1, 2, 3];

      var result = reverseReduce(start, function(total, curr) {
        return total * curr;
      }, 4)

      expect(result).to.be.equal(expected);
    })

    it("reverseReduces through other types not just numbers", function() {
      var expected = "!olleh";
      var start = ["h", "e", "l", "l", "o", "!"];

      var result = reverseReduce(start, function(total, curr) {
        return total + curr;
      })

      expect(result).to.be.equal(expected);
    })
  })
})
