const walker = () => {
  let x = 0;
  let y = 0;
  x = width / 2;
  y = height / 2;
  const randomStep = () => {
    return parseInt(random(4));
  }
  const step = () => {
    let choice = randomStep();
    if (choice == 0) {
      x++;
    } else if (choice == 1) {
      x--;
    } else if (choice == 2) {
      y++;
    } else {
      y--;
    }
  }
  const display = () => {
    stroke(0);
    point(x,y);
  }
  return { display, step };
}

let walkerObj;

function setup() {
  createCanvas(400, 400);
  walkerObj = walker();
}

function draw() {
  walkerObj.step();
  walkerObj.display();
}