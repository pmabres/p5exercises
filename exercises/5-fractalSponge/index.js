
function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(51);
  stroke(255);
  translate(240, 0, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();

}