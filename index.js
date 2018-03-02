const svg = require('./src/renderers/svg.js');
const svgRenderer = svg.create();
const { circle, hex, line, path, toString } = svgRenderer;

const tileHex = require('./src/tiles').tileHex(svgRenderer,150,true);
const c = require('./src/defaults').colors;

let tile = tileHex(c.green, 100,100);
tile.trackBorder(0,2);
tile.track(0,2);
tile.trackBorder(1,4);
tile.track(1,4);
tile.number(19);

let tile2 = tileHex(c.gray, 300,100);
tile2.trackBorder(1,2);
tile2.trackBorder(1,3);
tile2.trackBorder(1,4);
tile2.trackBorder(5,1);
tile2.track(1,2);
tile2.track(1,3);
tile2.track(1,4);
tile2.track(5,1);
tile2.sideCity(2);
tile2.sideCity(3);
tile2.sideCity(4);
tile2.sideCity(5);
tile2.label(0, "Chi");
tile2.sideValue(0, 90);
tile2.number(300);

let tile5 = tileHex(c.green, 500,100);
tile5.trackBorder(1,2);
tile5.trackBorder(1,3);
tile5.trackBorder(1,4);
tile5.trackBorder(5,1);
tile5.track(1,2);
tile5.track(1,3);
tile5.track(1,4);
tile5.track(5,1);
tile5.sideCity(2);
tile5.sideCity(3);
tile5.sideCity(4, "CW&I");
tile5.sideCity(5);
tile5.label(0, "Chi");
tile5.sideValue(0, 40);
tile5.number(298);

let tile3 = tileHex(c.brown, 100,300);
tile3.trackBorder(1,2);
tile3.trackBorder(2,5);
tile3.trackBorder(4,5);
tile3.track(2,5);
tile3.trackBorder(1,4);
tile3.track(1,2);
tile3.track(4,5);
tile3.track(1,4);
tile3.number(44);

let tile4 = tileHex(c.yellow, 300, 300);
tile4.trackBorder(2,2);
tile4.trackBorder(4,4);
tile4.track(2,2);
tile4.track(4,4);
tile4.city(1);
tile4.pointValue(0, 20);
tile4.number(6);

let tile6 = tileHex(c.plain, 500,300);
tile6.label(0, "Z");
tile6.city(1);
tile6.pointValue(4, 10);

console.log(toString());
