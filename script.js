const resizeBtn = document.getElementById('resize-btn');
const clearBtn = document.getElementById('clear-btn');
const grid = document.getElementById('grid');
const GRID_SIZE = '700px';
let gridSquares;
let gridLength = 16;

addGrid(gridLength);

clearBtn.addEventListener('click', clearGrid);

resizeBtn.addEventListener('click', () => {
  const input = getInput();
  if (validateInput(input)) {
    gridLength = input;
    removeGrid();
    addGrid(gridLength);
  }
});

// FUNCTIONS

function changeSquareColor(e) {
  const square = e.target;
  let color = square.style.backgroundColor;

  if (color) {
    const brightness = getBrightness(square);

    if (brightness) {
      setBrightness(square, brightness - 10);
    }
  } else {
    square.style.backgroundColor = getRandomRGB();
  }
}

function getBrightness(square) {
  const regEx = /\d+/;
  let brightness = square.style.filter.match(regEx);
  brightness = +brightness.toString();
  return brightness;
}

function setBrightness(square, brightness) {
  square.style.filter = `brightness(${brightness}%)`;
}

function getRandomRGB() {
  getRandomRGBComponent = () => Math.floor(Math.random() * 256);
  const red = getRandomRGBComponent();
  const green = getRandomRGBComponent();
  const blue = getRandomRGBComponent();
  return `rgb(${red}, ${green}, ${blue})`;
}

function addGrid(gridLength) {
  const squareSize = `${parseInt(GRID_SIZE) / gridLength}px`;

  for (let i = 0; i < gridLength; i++) {
    const row = document.createElement('div');
    row.classList.add('grid-row');
    grid.appendChild(row);

    for (let j = 0; j < gridLength; j++) {
      addGridSquare(row, squareSize);
    }
  }
  gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach((square) => {
    square.addEventListener('mouseover', changeSquareColor);
  });
}

function addGridSquare(row, squareSize) {
  const square = document.createElement('div');
  square.classList.add('grid-square');
  square.style.setProperty('width', squareSize);
  square.style.setProperty('height', squareSize);
  square.style.setProperty('filter', 'brightness(100%)');
  row.appendChild(square);
}

function validateInput(input) {
  if (input === null || input === '') return false;
  input = +input;
  if (!Number.isInteger(input) || input <= 0) {
    alert('Length has to be a positive whole number.');
    return false;
  }
  if (input > 100) {
    alert('Length has to be less than 100.');
    return false;
  }
  return true;
}

function getInput() {
  const input = prompt(
    `Enter new grid length (grid is currently ${gridLength} by ${gridLength} squares)`,
    gridLength,
  );
  return input;
}

function removeGrid() {
  grid.replaceChildren();
}

function clearGrid() {
  gridSquares.forEach((square) => {
    square.style.backgroundColor = '';
    square.style.filter = 'brightness(100%)';
  });
}
