
const p = (x,y) => {
  return { x, y }
}
const clr = (r,g,b) => {
  return { r, g, b };
}
var screenSize = p(640, 480);
function setup() {

  createCanvas(screenSize.x, screenSize.y);
  background(0);
}

const drawSquare = (position, size, color) => {
  fill(color.r, color.g, color.b );
  rect(position.x, position.y, size, size);
}

const drawDot = (position, color) => {
  drawSquare(position, 1, color);
}

var halfP = p(screenSize.x/2, screenSize.y/2);
var pos = p(halfP.x, halfP.y);
var counter = 0;
var b = 0;
var col = clr(0,0,0);

const modifyPos = ({ x, y }) => {
  let adder = valueShifter(x / screenSize.x, 0.6, 0, 0.1);
  x = cos(counter*0.5) * b + halfP.x;
  y = sin(counter*0.5) * b + halfP.y;
  b += adder;
  counter++;

  return p(x,y); 
}
const valueShifter = (val, max, min, step) => {
  if (val >= max) {
    return -step;
  }
  if (val <= min) {
    return step;
  }
  return step;
}

const morphColor = ({r, g, b}) => {
  r = (r + 1);
  if (r >= 255)
     g = (g + 1);
  if (g >= 255)
     b = (b + 1); 
  //if (r < 255) {
    //r = colorShifter(r);
  //}
  //if (g < 255 && r >= 255) {
    //g = colorShifter(g);
  //}
  //if (b < 255 && g >= 255) {
    //b = colorShifter(b);
  //}
  return { r, g, b }
}

function draw() {
  let newPos = modifyPos(pos);
  pos = newPos;
  col = morphColor(col);
  drawDot({ x: pos.x, y: pos.y }, { r: 255, g: 255, b: 255} );
  stroke(col.r, col.g, col.b);
}