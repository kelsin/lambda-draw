const { curry, forEach } = require("ramda");
const { hexData, HEX_RATIO, linear } = require("./util");
const c = require("./defaults").colors;

const tileHex = curry((render, hw, vertical, color, hx, hy) => {
  let svgHex = render.hex(hx, hy, hw, vertical, { fillColor: color, strokeWidth: 2, strokeColor: c.track });

  let hd = hexData(hw, vertical, hx, hy);

  let number = curry(number => {
    let percent = 0.86;
    let sx = hd.points[3][0];
    let sy = hd.points[3][1];
    let vx = sx * percent + hx * (1 - percent);
    let vy = sy * percent + hy * (1 - percent);
    render.text(
      vx - (vertical ? 0 : 2),
      vy - (vertical ? (number > 99 ? 0 : 2) : 0),
      number.toString(),
      {
        fillColor: "#000",
        fontSize: number > 99 ? 10 : 14,
        textAnchor: "start",
        fontFamily: "Helvetica, Arial, sans-serif"
      }
    );
  });

  let label = curry((point, value) => {
    let labelPoint = linear((value.toString().length > 2) ? 0.75 : 0.65, hd.points[point], [hx, hy]);
    render.text(labelPoint[0], labelPoint[1], value.toString(), {
      fontWeight: "bold",
      fontSize: (value.toString().length > 2) ? 20 : 30,
      fillColor: c.track
    });
  });

  let value = curry((points, percent, point, value) => {
    let sidePoint = points[point] || [hx, hy];

    let valuePoint = linear(percent, sidePoint, [hx, hy]);

    render.circle(valuePoint[0], valuePoint[1], 15, {
      fillColor: c.border,
      strokeColor: c.track,
      strokeWidth: 2
    });
    render.text(valuePoint[0], valuePoint[1], value.toString(), {
      fontWeight: "bold",
      fontSize: 18,
      fillColor: c.track
    });
  });

  let city = number => {
    switch (number) {
      case 1:
        render.circle(hx, hy, 28, { fillColor: c.border });
        render.circle(hx, hy, 25, {
          fillColor: c.border,
          strokeColor: c.track,
          strokeWidth: 2
        });
        break;
    }
  };

  let sideCity = (side, value = "") => {
    let percent = 20 / (hw * 0.5);
    let point = linear(percent, [hx, hy], hd.sides[side]);
    let clip = render.clip();
    clip.add(svgHex.clone());

    let border = render.circle(point[0], point[1], 28, { fillColor: c.border });
    let city = render.circle(point[0], point[1], 25, {
      fillColor: c.border,
      strokeColor: c.track,
      strokeWidth: 2
    });
    if (value.length > 0) {
      render.text(point[0] - 2, point[1], value, {
        textAnchor: "start",
        fillColor: c.track,
        fontSize: 14
      });
    }
    border.clipWith(clip);
    city.clipWith(clip);
  };

  let track = curry((type, color, width, from, to) => {
    let diff = from > to ? to + 6 - from : to - from;

    let radius;

    let attrs = {
      strokeWidth: width,
      strokeColor: color,
      strokeLinecap: "butt"
    };

    if (type === "narrow") {
      attrs.strokeDashArray = `${width},${width}`;
    }

    let fromPoint = `${hd.sides[from][0]} ${hd.sides[from][1]}`;
    let toPoint = `${hd.sides[to][0]} ${hd.sides[to][1]}`;

    switch (diff) {
      case 0:
        render.path(`m ${fromPoint} L ${hx} ${hy}`, attrs);
        break;
      case 1:
        radius = hd.edge * 0.5;
        render.path(
          `m ${fromPoint} A ${radius} ${radius} 0 0 0 ${toPoint}`,
          attrs
        );
        break;
      case 2:
        radius = hd.edge * 1.5;
        render.path(
          `m ${fromPoint} A ${radius} ${radius} 0 0 0 ${toPoint}`,
          attrs
        );
        break;
      case 3:
        render.path(`m ${fromPoint} L ${toPoint}`, attrs);
        break;
    }

    return render;
  });

  return {
    trackBorder: track("standard", "#fff", 14),
    narrowTrack: track("narrow", "#000", 10),
    track: track("standard", "#000", 10),
    city,
    sideCity,
    sideValue: value(hd.sides, 0.67),
    pointValue: value(hd.points, 0.6),
    value: value([], 0, 0),
    number,
    label
  };
});

module.exports = {
  tileHex
};
