import { expect } from "chai";
import { map } from "../func.js";


describe("Test the behavior of map()", function () {
  describe("The default calls to 'map' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        map(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        map([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        map([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of map() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      map([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      map([1, 2, 3], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })

    it("maps through all given values", function() {
      var expected = [1, 4, 9];
      var start = [1, 2, 3];

      var result = map(start, function(value) {
        return value * value;
      })

      expect(result).to.be.eql(expected);
    })

    it("does not modify original array", function() {
      var expected = [1, 4, 9];
      var start = [1, 2, 3];

      var result = map([1, 2, 3], function(value) {
        return value * value;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
