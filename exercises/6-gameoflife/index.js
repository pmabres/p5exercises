const c = (r,g=r,b=r) => {
  return { r, g , b };
}

const p = (x,y) => {
  return { x, y }
}
const cells = [];
const maxCells = 200;
let field = [];
const screenSize = p(600, 600);

const setupField = (rows, columns) => {
  const size = screenSize.y / rows;
  const field = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      const cell = simpleCell(p(x, y), size);
      cell.randomize();
      row.push(cell);
    }
    field.push(row);
  }
  return field;
}

const gameRules = (current, alives) => {
  const newCell = simpleCell(current.getPos(), current.getSize());
  if (alives == 3) {
    newCell.resurrect();
  }
  if (alives == 2 && current.isAlive()) {
    newCell.resurrect();
  }
  return newCell;
}

const addAlive = (adjacent) => {
  if (adjacent.isAlive()) {
    return 1;
  }
  return 0;
}
const getAlives = (position) => {
  let alives = 0;
  const { x, y } = position;
  for (let x2 = -1; x2 <= 1; x2++) {
    for (let y2 = -1; y2 <= 1; y2++) {
      try {
        if (x2 !== x || y2 !== y)
          alives += addAlive(field[x+x2][y+y2]);
      } catch {}
    } 
  }
  return alives;
}

const scanner = () => {
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      const current = field[x][y];
      field[x][y] = gameRules(current, getAlives(current.getPos()));
      field[x][y].draw();
    }
  }
}

const simpleCell = (position, size) => {
  let alive = false;
  let myPosition = position;
  let mySize = size;
  let drawPosition = p(position.x * size, position.y * size);
  const kill = () => {
    alive = false;
  }
  const resurrect = () => {
    alive = true;
  }
  const randomize = () => {
    if (random() > 0.3)
      kill();
    else
      resurrect();
  }
  const isAlive = () => {
    return alive;
  }

  const draw = () => {
    if (isAlive()) {
      drawUnit(drawPosition, size, c(255));
    }
  }
  const getPos = () => {
    return myPosition;
  }
  const getSize = () => {
    return mySize;
  }
  return { isAlive, draw, kill, resurrect, randomize, getPos, getSize }
}


const drawUnit = (position, size, color) => {
  fill(color.r, color.g, color.b );
  rect(position.x, position.y, size, size);
}

function setup() {
  createCanvas(screenSize.x, screenSize.y);
  field = setupField(maxCells, maxCells);
}
// returns a MouseEvent object
// as a callback argument
function onMouseHold() {
  if (mouseIsPressed) {
    const positionX = parseInt((mouseX / screenSize.x) * maxCells);
    const positionY = parseInt((mouseY / screenSize.y) * maxCells);
    field[positionX][positionY].resurrect();
  }
}
function draw() {
  background(0);
  onMouseHold();
  // frameRate(12);
  stroke(255);
  scanner();  
}