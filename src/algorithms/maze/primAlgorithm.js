import { NODE_STATE } from "../../constants";
import { randOdd } from "./helper";

const primAlgorithm = (start, target, rows, cols) => {
  // Initialize an array for the coordinates difference of the walls from a selected cell
  const walls = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  // Initialize the visualization order array
  const order = [];

  // Initialize a copy of the grid filled with wall nodes
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => NODE_STATE.WALL)
  );

  // Initialize an empty array for storing the current unexplored frontier
  const frontier = [];

  // Pick a random node for the starting point
  const [x0, y0] = [randOdd(cols), randOdd(rows)];

  // Push the node to the visualization order array with the empty tag
  order.push({ x: x0, y: y0, tag: NODE_STATE.EMPTY });
  // Update the final state of the empty node in the grid
  grid[y0][x0] = NODE_STATE.EMPTY;

  // Loop through the walls surrounding the node
  walls.forEach(({ dx, dy }) => {
    // Calculate the actual wall coordinates based off the difference from the starting node
    const [x, y] = [x0 + dx, y0 + dy];

    // Skip the wall if it is out of the grid boundaries or on the grid edges
    if (x <= 0 || x >= cols - 1 || y <= 0 || y >= rows - 1) return;

    // Mark the wall as being queued and add it to the frontier array
    grid[y][x] = NODE_STATE.QUEUED;
    frontier.push({ x, y });
  });

  // Continue looping until no more wall could be explored in the frontier array
  while (frontier.length) {
    // Select a random wall node from the frontier and remove it from the array
    const { x, y } = frontier.splice(Math.floor(Math.random() * frontier.length), 1)[0];

    // Calculate the coordinates of neighbouring nodes divided by the selected wall
    const neighbours =
      y % 2 === 0
        ? [
            { x, y: y - 1 },
            { x, y: y + 1 },
          ]
        : [
            { x: x - 1, y },
            { x: x + 1, y },
          ];

    // Loop through both of the neighbours
    neighbours.forEach(({ x: x1, y: y1 }) => {
      // Skip the neighbour if it has already been visited before
      if (grid[y1][x1] !== NODE_STATE.WALL) return;

      // Loop through the walls surrounding the neighbour
      walls.forEach(({ dx, dy }) => {
        // Calculate the actual wall coordinates based off the difference from the neighbour
        const [x2, y2] = [x1 + dx, y1 + dy];

        // Skip the wall if it is out of the grid boundaries or on the grid edges
        if (x2 <= 0 || x2 >= cols - 1 || y2 <= 0 || y2 >= rows - 1) return;

        // Skip the wall if it has already been added to the frontier array
        if (grid[y2][x2] === NODE_STATE.QUEUED) return;

        // Mark the wall as being queued and add it to the frontier array
        grid[y2][x2] = NODE_STATE.QUEUED;
        frontier.push({ x: x2, y: y2 });
      });

      // Push the wall and the unvisited neighbour to the visualization order array with the empty tag
      order.push({ x, y, tag: NODE_STATE.EMPTY });
      order.push({ x: x1, y: y1, tag: NODE_STATE.EMPTY });

      // Update the final state of both of the nodes in the grid to an empty state
      grid[y][x] = NODE_STATE.EMPTY;
      grid[y1][x1] = NODE_STATE.EMPTY;
    });

    // Reset the wall node in final grid state back to its original state if both neighbours have already been visited
    if (grid[y][x] === NODE_STATE.QUEUED) grid[y][x] = NODE_STATE.WALL;
  }

  // Reset the start and the target node in final grid state back to its original state
  grid[start.y][start.x] = NODE_STATE.START;
  grid[target.y][target.x] = NODE_STATE.TARGET;

  // Return the visualization order array, and the final grid state after the maze generation process finished
  return { order, final: grid };
};

export default primAlgorithm;
