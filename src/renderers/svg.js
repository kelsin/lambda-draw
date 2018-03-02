const {
  applyTo,
  assoc,
  compose,
  curry,
  flip,
  has,
  identity,
  ifElse,
  invoker,
  join,
  map,
  merge,
  prop
} = require("ramda");
const { hexData, mapKeys } = require("../util");
const color = require("color");

const defaults = {
  fill: "none",
  stroke: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "bevel",
  "font-family": "Limelight, Georgia"
};

const ATTRS = {
  fillColor: "fill",
  strokeColor: "stroke",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeDashArray: "stroke-dasharray",
  strokeDashOffset: "stroke-dashoffset",
  fontFamily: "font-family",
  fontSize: "font-size",
  fontWeight: "font-weight",
  textAnchor: "text-anchor",
  alignmentBaseline: "alignment-baseline",
  x: "x",
  y: "y"
};

const convertAttrs = compose(merge(defaults), mapKeys(flip(prop)(ATTRS)));

var window = window || require("svgdom");
const document = window.document;

const SVG = require("svgjs")(window);

const pointsToString = compose(join(" "), map(join(",")));

// (diameter, draw) => draw.circle(diameter);
const drawCircle = invoker(1, "circle");

// (points, draw) => draw.polygon(points);
const drawPolygon = invoker(1, "polygon");

// (x1, y1, x2, y2, draw) => draw.line(x1, y1, x2, y2);
const drawLine = invoker(4, "line");

// (path, draw) => draw.path(path);
const drawPath = invoker(1, "path");

// (attrs, draw) => draw.attr(attrs);
const drawAttr = invoker(1, "attr");

// (x, y, draw) => draw.move(x, y);
const drawMove = invoker(2, "move");

// (x, y, draw) => draw.center(x, y);
const drawCenter = invoker(2, "center");

// (value, draw) => draw.text(value);
const drawText = invoker(1, "plain");

const clip = draw => () => draw.clip();

const text = curry((draw, x, y, value, attrs = {}) => {
  return compose(
    drawAttr(
      convertAttrs(
        merge(
          {
            x: x,
            y: y,
            alignmentBaseline: "middle",
            textAnchor: "middle"
          },
          attrs
        )
      )
    ),
    drawText(value)
  )(draw);
});

const circle = curry((draw, x, y, r, attrs = {}) => {
  return compose(
    drawCenter(x, y),
    drawAttr(convertAttrs(attrs)),
    drawCircle(r * 2)
  )(draw);
});

const hex = curry((draw, x, y, w, vertical = true, attrs = {}) => {
  return compose(
    drawCenter(x, y),
    drawAttr(convertAttrs(attrs)),
    drawPolygon(pointsToString(hexData(w, vertical).points))
  )(draw);
});

const line = curry((draw, x1, y1, x2, y2, attrs = {}) => {
  return compose(drawAttr(convertAttrs(attrs)), drawLine(x1, y1, x2, y2))(draw);
});

const path = curry((draw, path, attrs = {}) => {
  return compose(drawAttr(convertAttrs(attrs)), drawPath(path))(draw);
});

const create = () => {
  let draw = SVG(document.documentElement);
  let defs = draw.defs();
  defs
    .element("style")
    .words("@import url('https://fonts.googleapis.com/css?family=Limelight');");
  return assoc(
    "toString",
    () => draw.svg(),
    map(applyTo(draw), {
      clip,
      circle,
      hex,
      line,
      path,
      text
    })
  );
};

module.exports = {
  create,
  clip,
  circle,
  hex,
  line,
  path,
  text,
  convertAttrs,
  pointsToString
};
