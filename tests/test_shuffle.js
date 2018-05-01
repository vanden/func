import { expect } from "chai";
import { shuffle } from "../func.js";


describe("Test the behavior of shuffle()", function () {
  describe("The default calls to 'shuffle' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        shuffle(undefined)
      }).to.throw("Argument is not of type Array.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        shuffle([1, 10, 2])
      }).to.not.throw();
    })
  })

  describe("The default behavior of shuffle() should ...", function() {
    it("returns an empty array when given an empty array", function() {
      expect(shuffle([])).to.be.eql([]);
    })

    it("returns a correct array with one argument", function() {
      var expected = [4, 3, 2, 1, 0];

      expect(shuffle(expected)).to.include.members(expected);
    })

    it("does not modify original array", function() {
      var expected = [6, 2, 12];

      var result = shuffle(expected);

      expect(result).to.not.be.equal(expected);
    })
  })
})
