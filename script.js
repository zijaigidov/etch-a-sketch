const grid = document.getElementById('grid');
const GRID_SIZE = '700px';
let gridLength = 16;

addGrid(gridLength);

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
