import { expect } from "chai";
import { bigFreeze } from "../func.js";


describe("Test the behavior of bigFreeze()", function () {
  describe("The default calls to 'bigFreeze' should ...", function () {
    it("return undefined if no arguments given", function () {
      expect(bigFreeze(undefined)).to.be.equal(undefined);
    })

    it("return original item if not array or object", function () {
      var expected = "hello, world!";
      expect(bigFreeze(expected)).to.be.equal(expected);
    })
  })

  describe("The default behavior of bigFreeze() should ...", function () {
    it("return an empty frozen array and throws errors", function () {
      var result = bigFreeze([]);

      expect(function() {
        result.push(1);
      }).to.throw();
    })

    it("return a empty frozen object and throws errors", function () {
      var result = bigFreeze({});

      expect(function() {
        result["hello"] = "world!";
      }).to.throw();
    })

    it("throw errors on nested array", function () {
      var result = bigFreeze([0, 1, [2, 3, [4]]]);

      expect(function() {
        result[2][2].push(5);
      }).to.throw();
    })

    it("throw errors on nested object", function () {
      var result = bigFreeze({
        "hello": {
          "world": {}
        }
      });

      expect(function() {
        result["hello"]["world"]["foo"] = "!";
      }).to.throw();
    })

    it("does not modify original array", function () {
      var expected = [6, 2, 12];

      expect(bigFreeze(expected)).to.be.equal(expected);
    })
  })
})
