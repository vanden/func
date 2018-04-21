import { expect } from "chai";
import { each } from "../func.js";


describe("Test the behavior of each()", function () {
  describe("The default calls to 'each' should ...", function() {
    it("throw an error if a array is not given", function() {
      expect(function() {
        each(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        each([1, 2, 3], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        each([1, 2, 3], function() {})
      }).to.not.throw();
    })
  })

  describe("The functionality of each() should ...", function() {
    it("attempt to traverse an empty array", function() {
      var testArr = [];
      var testFunc = function() {
        each([], function(element) {
          testArr.push(element);
        })

        return testArr;
      }

      expect(testFunc()).to.deep.equal([])
    })

    it("traverse every element of an array", function() {
      var testArr = [];
      var testFunc = function() {
        each([1, 2, 3], function(element) {
          testArr.push(element);
        })

        return testArr;
      }

      expect(testFunc()).to.deep.equal([1, 2, 3])
    })
  })
})
