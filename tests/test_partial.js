import { expect } from "chai";
import { partial } from "../func.js";


describe("Test the behavior of partial()", function () {
  describe("The default calls to 'partial' should ...", function() {
    it("throw an error if a function is not first argument", function() {
      expect(function() {
        partial(undefined, 3)
      }).to.throw("Argument is not of type Function.");
    })

    it("return a function", function() {
      expect(partial(function() {})).to.be.a("function");
    })

    it("not throw errors if correct arguments are given", function() {
      expect(function() {
        partial(function() {}, 3, 6)
      }).to.not.throw();
    })
  })

  describe("The default behavior of partial() should ...", function() {
    it("not execute the function initially", function() {
      var tick = 0;
      partial(function() {
        tick += 1;
      })

      expect(tick).to.be.equal(0);
    })

    it("execute only once when partial is called", function() {
      var tick = 0;
      var partialFunc = partial(function() {
        tick += 1;
      });

      partialFunc();

      expect(tick).to.be.equal(1);
    })

    it("returns the correct value with simple partial", function() {
      var expected = 6;
      var start = 2;

      var result = partial(function(x, y) {
        return x * y;
      }, 2);

      expect(result(3)).to.be.equal(expected);
    })

    it("returns the correct value with multiple arguments", function() {
      var expected = 24;

      var result = partial(function(x, y, z) {
        return x * y * z;
      }, 2, 3)

      expect(result(4)).to.be.equal(expected);
    })

    it("ignores extra arguments", function() {
      var expected = "hello, world!";

      var result = partial(function(greeting, subject) {
        return greeting + subject;
      }, "hello, ")

      expect(result("world!", "gid gawd")).to.be.equal(expected);
    })
  })
})
