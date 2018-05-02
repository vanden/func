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
    it("not initially execute", function() {
      var tick = 0;
      only(3, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("not execute when given a zero", function() {
      var tick = 0;
      var onlied = only(0, function() {
        tick += 1;
      })

      onlied();
      onlied();
      onlied();

      expect(tick).to.be.equal(0);
    })

    it("execute a correct number of times after provided times", function() {
      var tick = 0;
      var onlied = only(2, function() {
        tick += 1;
      })

      onlied();
      onlied();
      onlied();
      onlied();
      onlied();

      expect(tick).to.be.equal(2);
    })


    it("returns the correct result for the correct calls", function() {
      var expected = "hello, world!";
      var onlied = only(3, function() {
        return "hello, world!";
      })

      expect(onlied()).to.be.equal(expected);
      expect(onlied()).to.be.equal(expected);
      expect(onlied()).to.be.equal(expected);
      expect(onlied()).to.be.equal(undefined);
    })
  })
})
