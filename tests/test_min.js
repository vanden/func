import { expect } from "chai";
import { min } from "../func.js";


describe("Test the behavior of min()", function () {
  describe("The default behavior of 'min' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        min(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        min([], 23)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        min([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of min() should ...", function() {
    it("return the correct value for numbers without function", function() {
      var expected = 1;
      var result = min([1, 2, 3]);

      expect(result).to.be.equal(expected);
    })

    it("return the correct value for strings with function", function() {
      var expected = "z"
      var result = min(["a", "b", "x", "y", "z"], function(min, curr) {
        return min.charCodeAt(0) > curr.charCodeAt(0);
      })

      expect(result).to.be.equal("a");
    })


    it("does not modify original array", function() {
      var start = [2, 6, 12];
      var result = min(start)

      expect(start).to.be.equal(start);
    })
  })
})
