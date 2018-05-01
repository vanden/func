import { expect } from "chai";
import { stretchCurry } from "../func.js";


describe("Test the behavior of stretchCurry()", function () {
  describe("The default calls to 'stretchCurry' should ...", function() {
    it("throw an error if the first argument is not an integer", function() {
      expect(function() {
        stretchCurry(undefined, function() {})
      }).to.throw("Argument is not of type Integer.");
    })

    it("throw an error if a function is not second argument", function() {
      expect(function() {
        stretchCurry(3)
      }).to.throw("Argument is not of type Function.");
    })

    it("return a function", function() {
      expect(stretchCurry(3, function() {})).to.be.a("function");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        stretchCurry(4, function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of stretchCurry() should ...", function() {
    it("not execute the function initially", function() {
      var tick = 0;
      stretchCurry(3, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("execute only once regardless of curries", function() {
      var tick = 0;
      var stretchCurryFunc = stretchCurry(3, function() {
        tick += 1;
      });

      stretchCurryFunc(1)(2)(3);

      expect(tick).to.be.equal(1);
    })

    it("returns the correct value with simple stretchCurry", function() {
      var expected = 6;

      var stretchCurryFunc = stretchCurry(3, function(x, y, z) {
        return x + y + z;
      });

      var result = stretchCurryFunc(1)(2)(3);

      expect(result).to.be.equal(expected);
    })

    it("returns the correct value with multiple argument curries", function() {
      var expected = 6;

      var stretchCurryFunc = stretchCurry(3, function(x, y, z) {
        return x + y + z;
      });

      var result = stretchCurryFunc(1, 2)(3);

      expect(result).to.be.equal(expected);
    })

    it("throws error after stretchCurry is finished", function() {
      var expected = 24;

      var result = stretchCurry(2, function(x, y, z) {
        return x * y * z;
      })

      expect(function(){
        result(4)(2)(3);
      }).to.throw();
    })
  })
})
