import { NODE_STATE } from "../../constants";

const basicRandom = (start, target, rows, cols) => {
  // Initialize visualization order array
  const order = [];

  // Initialize an empty copy of the grid with the start and target nodes applied
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => NODE_STATE.EMPTY)
  );
  grid[start.y][start.x] = NODE_STATE.START;
  grid[target.y][target.x] = NODE_STATE.TARGET;

  // Draw a border around the grid
  for (let y = 0; y < rows; y++) {
    order.push({ x: 0, y, tag: NODE_STATE.WALL });
    grid[y][0] = NODE_STATE.WALL;
    order.push({ x: cols - 1, y: rows - y - 1, tag: NODE_STATE.WALL });
    grid[rows - y - 1][cols - 1] = NODE_STATE.WALL;
  }
  for (let x = 1; x < cols - 1; x++) {
    order.push({ x, y: rows - 1, tag: NODE_STATE.WALL });
    grid[rows - 1][x] = NODE_STATE.WALL;
    order.push({ x: cols - x - 1, y: 0, tag: NODE_STATE.WALL });
    grid[0][cols - x - 1] = NODE_STATE.WALL;
  }

  // Loop through all the possible rows (excluding the edges) of the grid
  for (let y = 1; y < rows - 1; y++) {
    // Loop through all the possible columns of the grid
    for (let x = 1; x < cols - 1; x++) {
      // Skip the start and target node to avoid accidental overrides
      if ((x === start.x && y === start.y) || (x === target.x && y === target.y)) continue;

      // Check if need to update current cell to a wall
      if (Math.random() < 0.3) {
        // Push the cell to the visualization order array with the wall tag
        order.push({ x, y, tag: NODE_STATE.WALL });
        // Update the final state of the wall node in the grid
        grid[y][x] = NODE_STATE.WALL;
      }
    }
  }

  // Return the visualization order array, and the final grid state after the maze generation process finished
  return { order, final: grid };
};

export default basicRandom;
