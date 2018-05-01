import { expect } from "chai";
import { unique } from "../func.js";


describe("Test the behavior of unique()", function () {
  describe("The default calls to 'unique' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        unique(undefined)
      }).to.throw("Argument is not of type Array.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        unique([1, 10, 2])
      }).to.not.throw();
    })
  })

  describe("The default behavior of unique() should ...", function() {
    it("returns an empty array when given an empty array", function() {
      expect(unique([])).to.be.eql([]);
    })

    it("returns a correct array with one argument", function() {
      var start = [4, 4, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0];
      var expected = [4, 3, 2, 1, 0];

      expect(unique(start)).to.include.members(expected);
    })

    it("does not modify original array", function() {
      var expected = [6, 2, 12];

      expect(unique(expected)).to.not.be.equal(expected);
    })
  })
})
