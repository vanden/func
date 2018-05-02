import { expect } from "chai";
import { bigDup } from "../func.js";


describe("Test the behavior of bigDup()", function () {
  describe("The default calls to 'bigDup' should ...", function () {
    it("return undefined if no arguments given", function () {
      expect(bigDup(undefined)).to.be.equal(undefined);
    })

    it("return original item if not array or object", function () {
      var expected = "hello, world!";
      expect(bigDup(expected)).to.be.equal(expected);
    })
  })

  describe("The default behavior of bigDup() should ...", function () {
    it("return an empty frozen array and throws errors", function () {
      var result = [];

      expect(bigDup([])).to.be.eql(result);
    })

    it("return a empty frozen object and throws errors", function () {
      var result = {};

      expect(bigDup({})).to.be.eql(result);
    })

    it("make a copy of nested array", function () {
      var result = [0, 1, [2, 3, [4]]];

      expect(bigDup(result)).to.be.eql(result);
    })

    it("make a copy of nested object", function () {
      var result = {
        "one": {
          "arr": [0, 1, [2, 3, [4]]]
        }
      }

      expect(bigDup(result)).to.be.eql(result);
    })

    it("let original be modified without affecting duplicate", function () {
      var expected = {
        "one": {
          "arr": [0, 1, [2, 3, [4]]],
          "obj": {
            "hello": "world"
          }
        }
      }

      var result = bigDup(result);
      expected["one"]["obj"]["soLong"] = "fellas!";

      expect(bigDup(result)).to.not.be.eql(expected);
    })

    it("does not modify original array", function () {
      var expected = [6, 2, 12];

      expect(bigDup(expected)).to.be.equal(expected);
    })
  })
})
