import { expect } from "chai";
import { curry } from "../func.js";


describe("Test the behavior of curry()", function () {
  describe("The default calls to 'curry' should ...", function() {
    it("throw an error if the first argument is not an integer", function() {
      expect(function() {
        curry(undefined, function() {})
      }).to.throw("Argument is not of type Integer.");
    })

    it("throw an error if a function is not second argument", function() {
      expect(function() {
        curry(3)
      }).to.throw("Argument is not of type Function.");
    })

    it("return a function", function() {
      expect(curry(3, function() {})).to.be.a("function");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        curry(4, function() {})
      }).to.not.throw();
    })
  })

  describe("The default behavior of curry() should ...", function() {
    it("not execute the function initially", function() {
      var tick = 0;
      curry(3, function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("execute only once regardless of curries", function() {
      var tick = 0;
      var curryFunc = curry(3, function() {
        tick += 1;
      });

      curryFunc()()();

      expect(tick).to.be.equal(1);
    })

    it("returns the correct value with simple curry", function() {
      var expected = 6;

      var curryFunc = curry(3, function(x, y, z) {
        return x + y + z;
      });

      var result = curryFunc(1)(2)(3);

      expect(result).to.be.equal(expected);
    })

    it("throws error after curry is finished", function() {
      var expected = 24;

      var result = curry(2, function(x, y, z) {
        return x * y * z;
      })

      expect(function(){
        result(4)(2)(3);
      }).to.throw();
    })
  })
})
