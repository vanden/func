import { expect } from "chai";
import { max } from "../func.js";


describe("Test the behavior of max()", function () {
  describe("The default behavior of 'max' should ...", function() {
    it("throw an error if an array is not given", function() {
      expect(function() {
        max(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        max([], 23)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        max([], function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of max() should ...", function() {
    it("return the correct value for numbers without function", function() {
      var expected = 3;
      var result = max([1, 2, 3]);

      expect(result).to.be.equal(expected);
    })

    it("return the correct value for strings with function", function() {
      var expected = "z"
      var result = max(["a", "b", "x", "y", "z"], function(max, curr) {
        return max.charCodeAt(0) < curr.charCodeAt(0);
      })

      expect(result).to.be.equal("z");
    })


    it("does not modify original array", function() {
      var start = [2, 6, 12];
      var result = max(start)

      expect(start).to.be.equal(start);
    })
  })
})
