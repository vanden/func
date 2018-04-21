import { expect } from "chai";
import { reverseEach } from "../func.js";


describe("Test the behavior of reverseEach()", function () {
  describe("The default calls to 'reverseEach' should ...", function() {
    it("throw an error if a array is not given", function() {
      expect(function() {
        reverseEach(undefined, function() {})
      }).to.throw("Argument is not of type Array.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        reverseEach([1, 2, 3], undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        reverseEach([1, 2, 3], function() {})
      }).to.not.throw();
    })
  })

  describe("The functionality of reverseEach() should ...", function() {
    it("attempt to traverse an empty array", function() {
      var testArr = [];
      var testFunc = function() {
        reverseEach([], function(element) {
          testArr.push(element);
        })

        return testArr;
      }

      expect(testFunc()).to.deep.equal([])
    })

    it("traverse every element of an array", function() {
      var testArr = [];
      var testFunc = function() {
        reverseEach([1, 2, 3], function(element) {
          testArr.push(element);
        })

        return testArr;
      }

      expect(testFunc()).to.deep.equal([3, 2, 1])
    })
  })
})
