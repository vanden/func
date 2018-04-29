import { expect } from "chai";
import { filter } from "../func.js";


describe("Test the behavior of filter()", function () {
  describe("The default calls to 'filter' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        filter(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        filter([], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        filter([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of filter() should ...", function() {
    it("doesn't execute when given an empty array", function() {
      var tick = 0;
      filter([], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("executes the correct number of times", function() {
      var tick = 0;
      filter([1, 2, 3], function() {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })

    it("correctly filters through all given values", function() {
      var expected = [2];
      var start = [2, 6, 12];

      var result = filter(start, function(value) {
        return value < 5;
      })

      expect(result).to.be.eql(expected);
    })

    it("is content regardless of type", function() {
      var expected = ["is", "one"];
      var start = "This is one lonely world".split(" ");

      var result = filter(start, function(value) {
        return value.length < 4;
      })

      expect(result).to.be.eql(expected);
    })

    it("doesn't allow truthy passes", function() {
      var expected = [];
      var start = [1, "hello", [1]];

      var result = filter(start, function(value) {
        return value;
      })

      expect(result).to.be.eql(expected)
    })

    it("does not modify original array", function() {
      var expected = [2];
      var start = [2, 6, 12];

      var result = filter(start, function(value) {
        return value < 5;
      })

      expect(result).to.not.be.equal(expected);
    })
  })
})
