const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');
const clearBtn = document.getElementById('clear-btn');
const toggleBtn = document.getElementById('toggle-btn');
const grid = document.getElementById('grid');
const GRID_SIZE = '700px';
let gridSquares;
let isGridLinesToggled = true;
let gridLength = 16;

addGrid(gridLength);

sizeSlider.addEventListener('mousemove', updateSizeValue);
sizeSlider.addEventListener('change', changeGridSize);
toggleBtn.addEventListener('click', toggleGridLines);
clearBtn.addEventListener('click', clearGrid);

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
  if (isGridLinesToggled) square.classList.add('grid-line');
  square.style.setProperty('width', squareSize);
  square.style.setProperty('height', squareSize);
  square.style.setProperty('filter', 'brightness(100%)');
  row.appendChild(square);
}

function updateSizeValue() {
  const length = getSliderValue();
  sizeValue.textContent = `${length}x${length}`;
}

function getSliderValue() {
  let length = sizeSlider.value;
  length = Math.floor(length);
  return length;
}

function changeGridSize() {
  gridLength = getSliderValue();
  removeGrid();
  addGrid(gridLength);
}

function removeGrid() {
  grid.replaceChildren();
}

function toggleGridLines() {
  gridSquares.forEach((square) => {
    square.classList.toggle('grid-line');
  });
  isGridLinesToggled = !isGridLinesToggled;
}

function clearGrid() {
  gridSquares.forEach((square) => {
    square.style.backgroundColor = '';
    square.style.filter = 'brightness(100%)';
  });
}
