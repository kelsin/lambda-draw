const { expect } = require("chai");
const util = require("../src/util");

describe("util.js", function() {
  describe("mapKeys", function() {
    it("should handle undefined keys", function() {
      expect(util.mapKeys(key => undefined, { foo: "bar" })).to.be.empty;
    });

    it("should change an objects keys", function() {
      expect(util.mapKeys(key => "test", { foo: "bar" })).to.deep.equal({
        test: "bar"
      });
    });
  });

  describe("hexData", function() {
    it("should calculate hexagon data", function() {
      expect(util.hexData(100)).to.deep.equal({
        width: 100,
        edge: 57.735,
        offset: 28.868,
        long: 115.47,
        half: 50,
        points: [
          [0, 28.868],
          [50, 0],
          [100, 28.868],
          [100, 86.603],
          [50, 115.47],
          [0, 86.603]
        ]
      });
    });
  });
});
