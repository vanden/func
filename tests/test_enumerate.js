import { expect } from "chai";
import { enumerate } from "../func.js";


describe("Test the behavior of enumerate()", function () {
  describe("The default calls to 'enumerate' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        enumerate(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        enumerate([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("throw an error if a intial value is not an integer", function() {
      expect(function() {
        enumerate([], function() {}, "hello")
      }).to.throw("Argument is not of type Integer.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        enumerate([], function() {}, 1)
      }).to.not.throw();
    })
  })

  describe("The default behavior of enumerate() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      enumerate([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      enumerate([1, 2, 3], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })

    it("enumerates through all given values", function() {
      var expected = [1, 2, 3];
      var result = [];

      enumerate([1, 2, 3], function(index, value) {
        result.push(value);
      })

      expect(result).to.be.eql([1, 2, 3]);
    })

    it("enumerates through all given values and correct indices", function() {
      var expected = [[0, 1], [1, 2], [2, 3]];
      var result = [];

      enumerate([1, 2, 3], function(index, value) {
        result.push([index, value]);
      })

      expect(result).to.be.eql(expected);
    })

    it("enumerates through all given values and offset indices", function() {
      var expected = [[2, 1], [3, 2], [4, 3]];
      var result = [];

      enumerate([1, 2, 3], function(index, value) {
        result.push([index, value]);
      }, 2)

      expect(result).to.be.eql(expected);
    })
  })
})
