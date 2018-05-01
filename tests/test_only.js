import { expect } from "chai";
import { only } from "../func.js";


describe("Test the behavior of only()", function () {
  describe("The default calls to 'only' should ...", function() {
    it("throw an error if a number is not given", function() {
      expect(function() {
        only(undefined, function() {})
      }).to.throw("Argument is not of type Integer.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        only(3, undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        only(3, function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of only() should ...", function() {
    it("doesn't execute when given a negative number", function() {
      var tick = 0;
      only(-1, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("doesn't execute when given a zero", function() {
      var tick = 0;
      only(-1, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("execute a function a given number of only", function() {
      var tick = 0;
      only(3, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(3);
    })
  })
})
