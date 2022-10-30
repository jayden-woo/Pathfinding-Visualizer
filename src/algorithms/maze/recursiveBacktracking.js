import { NODE_STATE } from "../../constants";
import { randOdd } from "./helper";

// Get the array of valid neighbours of a given node in a random order
const neighbours = (x0, y0, rows, cols) => {
  // Calculate the coordinates of neighbouring nodes together with the walls between them
  const array = [
    { x: x0, y: y0 - 2, wx: x0, wy: y0 - 1 },
    { x: x0, y: y0 + 2, wx: x0, wy: y0 + 1 },
    { x: x0 - 2, y: y0, wx: x0 - 1, wy: y0 },
    { x: x0 + 2, y: y0, wx: x0 + 1, wy: y0 },
  ] // Remove the nodes which are out of the grid boundaries or on the grid edges
    .filter(({ x, y }) => x > 0 && x < cols - 1 && y > 0 && y < rows - 1);

  // Shuffle the array using the Fisher Yates method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const search = (grid, order, x0, y0, rows, cols) => {
  // Push the node to the visualization order array with the explored tag
  // indicating that it's part of the ongoing search
  order.push({ x: x0, y: y0, tag: NODE_STATE.EXPLORED });
  // Update the final state of the empty node in the grid
  // eslint-disable-next-line no-param-reassign
  grid[y0][x0] = NODE_STATE.EMPTY;

  // Loop through all the valid neighbours of the current node in a random order
  neighbours(x0, y0, rows, cols).forEach(({ x, y, wx, wy }) => {
    // Skip the neighbour if it has already been visited
    if (grid[y][x] === NODE_STATE.EMPTY) return;

    // Push the wall node to the visualization order array with the explored tag
    // indicating that it's part of the ongoing search
    order.push({ x: wx, y: wy, tag: NODE_STATE.EXPLORED });
    // Update the final state of the empty wall node in the grid
    // eslint-disable-next-line no-param-reassign
    grid[wy][wx] = NODE_STATE.EMPTY;

    // Call the recursive search function on the neighbour
    search(grid, order, x, y, rows, cols);

    // Push the wall node to the visualization order array with the empty tag
    // indicating that it's no longer part of the ongoing search
    order.push({ x: wx, y: wy, tag: NODE_STATE.EMPTY });
  });

  // Push the node to the visualization order array with the empty tag
  // indicating that it's no longer part of the ongoing search
  order.push({ x: x0, y: y0, tag: NODE_STATE.EMPTY });
};

const recursiveBacktracking = (start, target, rows, cols) => {
  // Initialize the visualization order array
  const order = [];

  // Initialize a copy of the grid filled with wall nodes
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => NODE_STATE.WALL)
  );

  // Call the recursive search function with a random starting node
  search(grid, order, randOdd(cols), randOdd(rows), rows, cols);

  // Reset the start and the target node in final grid state back to its original state
  grid[start.y][start.x] = NODE_STATE.START;
  grid[target.y][target.x] = NODE_STATE.TARGET;

  // Return the visualization order array, and the final grid state after the maze generation process finished
  return { order, final: grid };
};

export default recursiveBacktracking;
