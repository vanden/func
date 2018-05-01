import { expect } from "chai";
import { flatten } from "../func.js";


describe("Test the behavior of flatten()", function () {
  describe("The default calls to 'flatten' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        flatten(undefined)
      }).to.throw("Argument is not of type Array.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        flatten([1, 10, 2])
      }).to.not.throw();
    })
  })

  describe("The default behavior of flatten() should ...", function() {
    it("returns an empty array when given an empty array", function() {
      expect(flatten([])).to.be.eql([]);
    })

    it("returns a correctly flattened array", function() {
      var start = [[[4, 4, [4]], 3, 3, 3], [[2], [2]], [1, 1], 0, [[[0]]], 0, 0];
      var expected = [4, 4, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0];

      expect(flatten(start)).to.include.members(expected);
    })

    it("handle deeply nested arrays", function() {
      var start = [[[[[[[[[[[[[[[[[[[[6]]]]]]]]]]]]]]]]]]], 2, 12];
      var expected = [6, 2, 12];


      expect(flatten(expected)).to.not.be.equal(expected);
    })

    it("does not modify original array", function() {
      var expected = [6, 2, 12];

      expect(flatten(expected)).to.not.be.equal(expected);
    })
  })
})
