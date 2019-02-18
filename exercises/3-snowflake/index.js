
let dots = [];
let current;
function createDot(_x, _y) {
	let x = _x || 0;
	let y = _y || 0;
	let step = -1;
	let randomMultiplier = 5;
	let radio = 5;
	let show = () => {
		fill(255);
		stroke(255);
		ellipse(x, y, radio*2, radio*2);
	}
	let update = () => {
		x += step;
		y += random(-1, 1) * randomMultiplier;
	}
	let finished = () => {
		return x < 0;
	}
	return { x, y, show, update, finished };
}

function setup() {
  createCanvas(800, 800);
  let walks = 10;
  let step = 0;
  let accumulator = 0;
  // for (let i = 0; i < walks; i++) {
	current = createDot(width/2, 0);	
  // }
}

function draw() {
  background(0);
  translate(width/2,width/2);
  current.update();
  current.show();
  if (current.finished()) {
  	dots.push(current);
  	current = createDot(width/2,0);
  }
  for (let i = 0; i < dots.length; i++) {
  	dots[i].show();
  }
}