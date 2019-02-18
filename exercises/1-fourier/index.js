let time = 0;
let wave = [];
let slider;
let timeSlider;
function setup() {
	createCanvas(600, 400);
	slider = createSlider(1,20, 1);
	timeSlider = createSlider(1, 30, 1);
}

function draw() {
	background(0);
	translate(200, 200);
	// let n = 6;
	let x = 0;
	let y = 0;
	for (let i = 0; i < slider.value(); i++) {
		let prevx = x;
		let prevy = y;
		let nn = 1 + i * 2;
		let radius = 50 * (4 / (nn * PI));
		x += radius * cos(nn * time);
		y += radius * sin(nn * time);

		stroke(255,100);
		noFill();
		ellipse(prevx, prevy, radius * 2);

		stroke(255);
		line(prevx, prevy, x, y);
		//ellipse(x, y, 8);

		
		

	}
	wave.unshift(y);
	
	translate(150, 0);
	line(x - 150, y, 0, wave[0]);
	beginShape();
	noFill();
	for (let i = 0; i < wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();


	time += timeSlider.value() / 100;

	if (wave.length > 300) {
		wave.pop();
	}
}