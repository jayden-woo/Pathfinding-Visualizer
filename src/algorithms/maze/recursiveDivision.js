import { NODE_STATE, DIRECTION } from "../../constants";

// Return a random integer between the given range
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Return a random even integer between 2 and the given number
const randEven = (num) => Math.floor(randInt(2, num) / 2) * 2;

// Return a random odd integer between 1 and the given number
const randOdd = (num) => Math.floor(randInt(1, num - 1) / 2) * 2 + 1;

// Pick the dividing direction based on the width and height of the space
const pickDirection = (width, height) => {
  // Slice the space horizontally if it is taller than its width
  if (width < height) {
    return DIRECTION.HORIZONTAL;
  }
  // Slice the space vertically if it is wider than its height
  if (height < width) {
    return DIRECTION.VERTICAL;
  }
  // Pick a random direction if it equally as wide as it height
  return Math.random() < 0.5 ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL;
};

const divide = (grid, order, x0, y0, width, height, orientation) => {
  // Stop and return from the recursive call if the section could not be subdivided any more
  if (width < 3 || height < 3) return;

  const horizontal = orientation === DIRECTION.HORIZONTAL;

  // Find the starting coordinate of the wall
  let x = x0 + (horizontal ? 1 : randEven(width - 1));
  let y = y0 + (horizontal ? randEven(height - 1) : 1);

  // Find the difference in coordinates at each loop based on the direction of the wall
  const dx = horizontal ? 1 : 0;
  const dy = horizontal ? 0 : 1;

  // Find the coordinates of the passage cell in the wall
  const px = horizontal ? x0 + randOdd(width) : x;
  const py = horizontal ? y : y0 + randOdd(height);

  // Keep looping until the wall reaches the outer border of the grid
  for (; grid[y][x] !== NODE_STATE.WALL; x += dx, y += dy) {
    // Skip the start and target node to avoid accidental overrides
    if (grid[y][x] === NODE_STATE.START || grid[y][x] === NODE_STATE.TARGET) continue;

    // Skip the passage cell in the wall
    if (x === px && y === py) continue;

    // Push the node to the visualization order array with the wall tag
    order.push({ x, y, tag: NODE_STATE.WALL });
    // Update the final state of the wall node in the grid
    // eslint-disable-next-line no-param-reassign
    grid[y][x] = NODE_STATE.WALL;
  }

  // Find the next starting coordinate and the new width and height of the first subsection
  const x1 = x0;
  const y1 = y0;
  const w1 = horizontal ? width : x - x0;
  const h1 = horizontal ? y - y0 : height;
  // Call the recursive divide function with the new parameters for the first subsection
  divide(grid, order, x1, y1, w1, h1, pickDirection(w1, h1));

  // Find the next starting coordinate and the new width and height of the second subsection
  const x2 = horizontal ? x0 : x;
  const y2 = horizontal ? y : y0;
  const w2 = horizontal ? width : width - w1;
  const h2 = horizontal ? height - h1 : height;
  // Call the recursive divide function with the new parameters for the second subsection
  divide(grid, order, x2, y2, w2, h2, pickDirection(w2, h2));
};

const recursiveDivision = (start, target, rows, cols) => {
  // Initialize the visualization order array
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

  // Adjust the width and height by flooring it to the nearest odd number to ensure a possible solution exists
  const width = cols - ((cols - 1) % 2);
  const height = rows - ((rows - 1) % 2);

  // Call the recursive divide function with the adjusted parameters
  divide(grid, order, 0, 0, width, height, pickDirection(width, height));

  // Return the visualization order array, and the final grid state after the maze generation process finished
  return { order, final: grid };
};

export default recursiveDivision;
