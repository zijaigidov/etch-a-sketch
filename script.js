const grid = document.getElementById('grid');
const GRID_SIZE = '625px';
let gridSquares;
let gridLength = 16;
let isGridLinesToggled = true;

addGrid(gridLength);

// ADD GRID

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
  if (isGridLinesToggled) square.classList.add('grid-line');
  square.style.setProperty('width', squareSize);
  square.style.setProperty('height', squareSize);
  square.style.setProperty('filter', 'brightness(100%)');
  row.appendChild(square);
}

// GRID INTERACTIVITY

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

// GRID CONTROLS

const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');
const toggleBtn = document.getElementById('toggle-btn');
const clearBtn = document.getElementById('clear-btn');

sizeSlider.addEventListener('change', changeGridSize);
sizeSlider.addEventListener('mousemove', updateSizeValue);
toggleBtn.addEventListener('click', toggleGridLines);
clearBtn.addEventListener('click', clearGrid);

// GRID SIZE SLIDER

function changeGridSize() {
  gridLength = getSliderValue();
  removeGrid();
  addGrid(gridLength);
}

function getSliderValue() {
  let length = sizeSlider.value;
  length = Math.floor(length);
  return length;
}

function removeGrid() {
  grid.replaceChildren();
}

function updateSizeValue() {
  const length = getSliderValue();
  sizeValue.textContent = `${length}x${length}`;
}

// TOGGLE GRID LINES

function toggleGridLines() {
  gridSquares.forEach((square) => {
    square.classList.toggle('grid-line');
  });
  isGridLinesToggled = !isGridLinesToggled;
}

// CLEAR GRID

function clearGrid() {
  gridSquares.forEach((square) => {
    square.style.backgroundColor = '';
    square.style.filter = 'brightness(100%)';
  });
}
