
let speed;
let stars = [];
function createStar() {
	let x = random(-width, width);
  let y = random(-height, height);
	let z = random(width);
  let pz = z;
	return {
		x, y, z,
		show: () => {
			fill(200);
			noStroke();
			let sx = map(x/z, 0,1,0,width);
			let sy = map(y/z, 0,1,0,height);
			let r = map(z, 0, width, 8, 0);
			ellipse(sx, sy, r, r);
			stroke(200);
			
			let px = map(x/pz, 0,1,0,width);
			let py = map(y/pz, 0,1,0,height);
			line( px, py, sx, sy);
			pz = z;
			px = sx;
			py = sy;
		},
		update: () => {
			z = z - 10;
			if (z < 1) {
				z = width;
				x = random(-width, width);
  			y = random(-height, height);
				pz = z;
			}
		}
	}
}

function setup() {
  createCanvas(400, 400);
	for (let i = 0; i < 1000; i++) {
		stars.push(createStar());
	}
}

function draw() {
  background(0);
	translate( width/2, height/2);
	for (let i = 0; i < stars.length; i++) {
		stars[i].show();
		stars[i].update();
	}
}