const R = require("ramda");

// mapKeys :: (String -> String) -> Object -> Object
const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj)))
);

// removeUndefined :: Object -> Object
const removeUndefined = R.pickBy((val, key) => {
  return R.complement(R.equals("undefined"))(key);
});

const HEX_RATIO = 0.57735;

const hexData = (width, vertical = true, x, y) => {
  let edge = width * HEX_RATIO;
  let points = [];

  if (x === undefined) {
    x = edge;
  }

  if (y === undefined) {
    y = edge;
  }

  if (vertical) {
    points.push([x - width * 0.5, y - edge * 0.5]);
    points.push([x, y - edge]);
    points.push([x + width * 0.5, y - edge * 0.5]);
    points.push([x + width * 0.5, y + edge * 0.5]);
    points.push([x, y + edge]);
    points.push([x - width * 0.5, y + edge * 0.5]);
  } else {
    points.push([x - edge * 0.5, y - width * 0.5]);
    points.push([x + edge * 0.5, y - width * 0.5]);
    points.push([x + edge, y]);
    points.push([x + edge * 0.5, y + width * 0.5]);
    points.push([x - edge * 0.5, y + width * 0.5]);
    points.push([x - edge, y]);
  }

  let sides = R.mapAccum(
    ([x1, y1], [x2, y2]) => [[x2, y2], [(x1 + x2) / 2.0, (y1 + y2) / 2.0]],
    R.last(points),
    points
  )[1];

  return { width, edge, points, sides };
};

const linear = R.curry((percent, p1, p2) => [
  p1[0] * percent + p2[0] * (1.0 - percent),
  p1[1] * percent + p2[1] * (1.0 - percent)
]);

const midpoint = linear(0.5);

module.exports = {
  mapKeys: R.curry(R.compose(removeUndefined, mapKeys)),
  HEX_RATIO,
  hexData,
  linear,
  midpoint
};
