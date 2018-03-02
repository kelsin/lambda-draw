const { expect } = require("chai");
const svg = require("../../src/renderers/svg.js");

const { convertAttrs, pointsToString } = svg;
const { circle, hex } = svg.create();

describe("svg.js", function() {
  describe("convertAttrs", function() {
    it("should convert attributes for SVGs", function() {
      expect(convertAttrs({ test: "foo", fillColor: "red" })).to.deep.equal({
        fill: "red"
      });
    });
  });

  describe("pointsToString", function() {
    it("should convert an array of points to a string", function() {
      expect(pointsToString([[1, 2], [3, 4]])).to.equal("1,2 3,4");
    });
  });

  describe("circle()", function() {
    it("should return a circle", function() {
      expect(circle(50, 50, 5).svg()).to.equal(
        '<circle xmlns="http://www.w3.org/2000/svg" id="SvgjsCircle1006" r="5" cx="55" cy="55"></circle>'
      );
    });

    it("should return a red circle", function() {
      expect(circle(50, 50, 5, { fill: "#aa0000" }).svg()).to.equal(
        '<circle xmlns="http://www.w3.org/2000/svg" id="SvgjsCircle1007" r="5" cx="55" cy="55" fill="#aa0000"></circle>'
      );
    });
  });

  describe("hex()", function() {
    it("should return a hex", function() {
      expect(hex(50, 50, 5).svg()).to.equal(
        '<polygon xmlns="http://www.w3.org/2000/svg" id="SvgjsPolygon1008" points="50,51.4434 52.5,50 55,51.4434 55,54.33015 52.5,55.7735 50,54.33015"></polygon>'
      );
    });

    it("should return a red hex", function() {
      expect(hex(50, 50, 5, { fill: "#aa0000" }).svg()).to.equal(
        '<polygon xmlns="http://www.w3.org/2000/svg" id="SvgjsPolygon1009" points="50,51.4434 52.5,50 55,51.4434 55,54.33015 52.5,55.7735 50,54.33015" fill="#aa0000"></polygon>'
      );
    });
  });
});
