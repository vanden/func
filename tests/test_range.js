import { expect } from "chai";
import { range } from "../func.js";


describe("Test the behavior of range()", function () {
  describe("The default calls to 'range' should ...", function() {
    it("throw an error if a number is not given", function() {
      expect(function() {
        range("hello")
      }).to.throw("Argument is not of type Integer.");
    })

    it("throw an error if no arguments given", function() {
      expect(function() {
        range();
      }).to.throw("Argument is not of type Integer.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        range(1, 10, 2)
      }).to.not.throw();
    })
  })

  describe("The default behavior of range() should ...", function() {
    it("returns a correct array with negative direction", function() {
      var expected = [5, 4, 3, 2, 1];

      expect(range(5, 0, -1)).to.be.eql(expected);
    })

    it("returns an empty array when negative direction and positive step", function() {
      var expected = [];

      expect(range(5, 0, 1)).to.be.eql(expected);
    })

    it("returns a correct array with two arguments", function() {
      var expected = [5, 6, 7, 8, 9];

      expect(range(5, 10, 1)).to.be.eql(expected);
    })

    it("returns an empty array with zero step", function() {
      var expected = [];

      expect(range(5, 10, 0)).to.be.eql(expected);
    })
  })
})
