import { expect } from "chai";
import { iterator } from "../func.js";


describe("Test the behavior of iterator()", function () {
  describe("The default instantiation of 'iterator' should ...", function() {
    it("not be undefined when given an array", function () {
      expect(iterator([])).to.not.be.equal(undefined);
    })

    it("not be null when given an array", function () {
      expect(iterator([])).to.not.be.equal(null);
    })

    it("throw an error if not passed an array", function() {
      expect(function() {
        iterator(7)
      }).to.throw("Argument is not of type Array.");
    })

    it("return an object with the property 'step'", function() {
      expect(iterator([])).to.have.property('step');
    })

    it("return an object with the property 'done'", function() {
      expect(iterator([])).to.have.property('done');
    })
  })

  describe("The behavior of 'iterator.done()' method should ...", function() {
    it("return 'true' when given an empty array", function() {
      expect(iterator([]).done()).to.be.true;
    })

    it("return 'false' when given a non-empty array", function() {
      expect(iterator([1, 2, 3]).done()).to.be.false;
    })

    it("return true after last step", function() {
      var iter = iterator([1, 2, 3]);
      iter.step();
      iter.step();
      iter.step();

      expect(iter.done()).to.be.true
    })
  })

  describe("The behavior of 'iterator.step()' method should ...", function() {
    it("return undefined on first step if given empty array", function() {
      expect(iterator([]).step()).to.be.undefined
    })

    it("return first element on first step", function() {
      expect(iterator([1, 2, 3]).step()).to.be.equal(1);
    })

    it("return last element on last step", function() {
      var iter = iterator([1, 2, 3]);
      iter.step();
      iter.step();

      expect(iter.step()).to.be.equal(3);
    })

    it("return undefined after last step", function() {
      var iter = iterator([1, 2, 3]);
      iter.step();
      iter.step();
      iter.step();

      expect(iter.step()).to.be.undefined
    })
  })
})
