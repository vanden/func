import { expect } from "chai";
import { sample } from "../func.js";


describe("Test the behavior of sample()", function () {
  describe("The default calls to 'sample' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        sample(undefined, 3)
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if an array is not given", function() {
      expect(function() {
        sample([1, 2, 3])
      }).to.throw("Argument is not of type Integer.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        sample([1, 10, 2], 3)
      }).to.not.throw();
    })
  })

  describe("The default behavior of sample() should ...", function() {
    it("returns an empty array when given an empty array", function() {
      expect(sample([], 3)).to.be.eql([]);
    })

    it("returns a correct array with valid arguments", function() {
      var expected = [4, 3, 2, 1, 0];

      expect(expected).to.include.members(sample(expected, 3));
    })

    it("does not modify original array", function() {
      var expected = [6, 2, 12];

      var result = sample(expected, 3);

      expect(result).to.not.be.equal(expected);
    })
  })
})
