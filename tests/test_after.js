import { expect } from "chai";
import { after } from "../func.js";


describe("Test the behavior of after()", function () {
  describe("The default calls to 'after' should ...", function() {
    it("throw an error if a number is not given", function() {
      expect(function() {
        after(undefined, function() {})
      }).to.throw("Argument is not of type Integer.");
    })

    it("throw an error if a function is not given", function() {
      expect(function() {
        after(3, undefined)
      }).to.throw("Argument is not of type Function.");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        after(3, function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of after() should ...", function() {
    it("not initially execute", function() {
      var tick = 0;
      after(3, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("immediately returns value when given 0", function() {
      var expected = "hello";
      var afterd = after(0, function() {
        return "hello";
      })

      expect(afterd()).to.be.equal(expected);
    })

    it("execute a correct number of times after provided times", function() {
      var tick = 0;
      var aftered = after(2, function() {
        tick += 1;
      })

      aftered();
      aftered();
      aftered();
      aftered();
      aftered();

      expect(tick).to.be.equal(3);
    })


    it("returns the correct result for the correct calls", function() {
      var expected = "hello, world!";
      var afterd = after(3, function() {
        return "hello, world!";
      })

      expect(afterd()).to.be.equal(undefined);
      expect(afterd()).to.be.equal(undefined);
      expect(afterd()).to.be.equal(undefined);
      expect(afterd()).to.be.equal("hello, world!");
    })
  })
})
