import { expect } from "chai";
import { reject } from "../func.js";


describe("Test the behavior of reject()", function () {
  describe("The default calls to 'reject' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        reject(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        reject([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        reject([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of reject() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      reject([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      reject([1, 2, 3], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })

    it("correctly rejects through all given values", function() {
      var expected = [6, 12];
      var start = [2, 6, 12];

      var result = reject(start, function(value) {
        return value < 5;
      })

      expect(result).to.be.eql(expected);
    })

    it("is content regardless of type", function() {
      var expected = ["This", "lonely", "world"];
      var start = "This is one lonely world".split(" ");

      var result = reject(start, function(value) {
        return value.length < 4;
      })

      expect(result).to.be.eql(expected);
    })

    it("does not modify original array", function() {
      var expected = [2];
      var start = [2, 6, 12];

      var result = reject(start, function(value) {
        return value < 5;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
