const grid = document.getElementById('grid');
const GRID_SIZE = '700px';
let gridLength = 16;

addGrid(gridLength);

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
      const square = document.createElement('div');
      square.classList.add('grid-square');
      square.style.setProperty('width', squareSize);
      square.style.setProperty('height', squareSize);
      row.appendChild(square);
    }
  }
}
