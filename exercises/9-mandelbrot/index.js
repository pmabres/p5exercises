const p = (x,y) => {
  return { x, y }
}
const clr = (r,g,b) => {
  return { r, g, b, toArray:() => {
    return [r,g,b, 255];
  } };
}
const colorTable = [
  clr(66,   30,  15),
  clr(25,    7,  26),
  clr(9,     1,  47),
  clr(4,     4,  73),
  clr(0,     7, 100),
  clr(12,   44, 138),
  clr(24,   82, 177),
  clr(57,  125, 209),
  clr(134, 181, 229),
  clr(211, 236, 248),
  clr(241, 233, 191),
  clr(248, 201,  95),
  clr(255, 170,   0),
  clr(204, 128,   0),
  clr(153, 87,    0),
  clr(106, 52,    3)
]

const complex = (r,i) => {
  const cplx = {
    get: () => {
      return { r, i };
    },
    getAbs:() => {
      return sqrt(r*r+i*i);
    },
    getFastAbs:() => {
      return r*r+i*i;
    },
    plus: (ocplx) => {
      let { r: or, i: oi } = ocplx.get();
      return complex(r + or, i + oi);
    },
    subs:(ocplx) => {
      let { r: or, i: oi } = ocplx.get();
      return complex(r - or, i - oi);
    },
    mult: (ocplx) => {
      let { r: or, i: oi } = ocplx.get();
      let tmpR = r * or - i * oi;
      let tmpI = r * oi + i * or;
      return complex(tmpR, tmpI);
    },
    squared:() => {
      let tmpR = r * r - i * i;
      let tmpI = 2 * r * i;
      return complex(tmpR, tmpI);
    }
    
  }
  return cplx;
} 

var screenSize = p(300, 300);
function setup() {
  createCanvas(screenSize.x, screenSize.y);
  background(255);
  createElements();
}

const createElements = () => {
  removeElements();
  isJuliaCheckBox = createCheckbox("isjulia", isJulia);
  isJuliaCheckBox.changed(isJuliaChecked);
  if (isJulia) {
    juliaRealSlider = createSlider(-1,1,0,0.01);
    juliaImSlider = createSlider(-1,1,0,0.01);
  }
  zoomSlider = createSlider(1,20, 1, 0.1);
  xSlider = createSlider(-3000, 3000,0, 1);
  ySlider = createSlider(-3000, 3000,0, 1);
}

function isJuliaChecked() {
  isJulia = this.checked();
  createElements();
  isDirty = true;
}

const STEPS = 20;
var count = 0;
const Zoom = 1;
const shiftX = 0;
const shiftY = 0;
var isJuliaCheckbox;
var juliaRealSlider;
var juliaImSlider;
var zoomSlider;
var xSlider
var ySlider
var xVal;
var yVal;
var zoomVal;
var juliaXValue;
var juliaYValue;
// const julias = [
//   complex(0.285, 0.01),
//   complex(-0.7269, 0.1889),
//   complex(-0.8, 0.156),
//   complex(-0.4, 0.6)
// ]
var isJulia = false;
var isDirty = true;
const checkDirty = () => {
    var result = false;
    if (!isDirty &&
            zoomSlider.value() != zoomVal ||
            xSlider.value() != xVal ||
            ySlider.value() != yVal) {
      zoomVal = zoomSlider.value();
      xVal = xSlider.value();
      yVal = ySlider.value();
      result = true;
    }
    if (!isDirty && isJulia && 
      juliaRealSlider && juliaRealSlider.value() != juliaXValue ||
      juliaImSlider && juliaImSlider.value() != juliaYValue) {
      juliaXValue = juliaRealSlider.value();
      juliaYValue = juliaImSlider.value();
      result = true;
    }
    isDirty = result;
}
// const juliaIndex = 3;
const drawMandelbrot = () => {
  if (!isDirty) {
    return;
  }
  var total = screenSize.y*screenSize.x;
  var counter = 0;
  let c;
  if (isJulia) {
    c = complex(juliaXValue, juliaYValue);
  }
  for (var xScreen=0;xScreen<screenSize.x;xScreen++) {
    var x = (xScreen * 4 / zoomVal / screenSize.x) - (2 + xVal / screenSize.x) / zoomVal;
    for (var yScreen=0;yScreen<screenSize.y;yScreen++) {
      var y = (yScreen * 4 / zoomVal / screenSize.y) - (2 + yVal / screenSize.y) / zoomVal;
      let z = complex(x, y);
      if (!isJulia) c = complex(x, y);
      let finalColor = 255;
      let n = 0;
      for (; n < STEPS; n++) {
        if (z.getFastAbs() > 4) {
          break;
        }
        z = z.mult(z).plus(c);
      }
      //TODO: try to understand scaping value mu and coloring
      if (n == STEPS) {
        finalColor = clr(0, 0, 0);
      } else {
        let mu = n - (log (log (z.getAbs()))) / log(2.0);
        //let colorValue = Math.round(Math.sqrt(n + 1 - mu) * 256) % colorTable.length;
        //colorValue = Math.abs(Math.round(colorTable.length - mu * (colorTable.length)) % colorTable.length);
        //finalColor = 255 - mu * 255 / STEPS
        let colorValue = 255 - mu * 255 / STEPS
        finalColor = clr(colorValue, colorValue, colorValue);
        //finalColor = colorTable[colorValue]
        if (!finalColor) {
          console.log(mu)
          console.log(colorValue)
          console.log(n)
          console.log(colorTable.length)
        }
      }
      set(xScreen, yScreen, finalColor.toArray());
    } 
  }
  updatePixels();
  isDirty = false;
}
function draw() {
  checkDirty();
  drawMandelbrot();
}