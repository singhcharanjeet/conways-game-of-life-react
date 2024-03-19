export function createEmptyGrid(columns, rows) {
  let grid = [];
  for (let i = 0; i < columns; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i].push(false);
    }
  }
  return grid;
}

export function generateRandomGrid(columns, rows) {
  let grid = [];
  for (let i = 0; i < columns; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i].push(Math.random() > 0.85);
    }
  }
  return grid;
}

export function countCellNeighbors(grid, x, y) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      if (grid[newX][newY]) {
        count++;
      }
    }
  });

  return count;
}
