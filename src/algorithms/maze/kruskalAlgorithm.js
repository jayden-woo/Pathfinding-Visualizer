import DisjointSet from "ml-disjoint-set";
import { NODE_STATE } from "../../constants";

const kruskalAlgorithm = (start, target, rows, cols) => {
  // Initialize a new disjoint set and a 2d reference array for the sets in which each node belongs to
  const set = new DisjointSet();
  const ref = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

  // Initialize the visualization order array
  const order = [];

  // Initialize a copy of the grid filled with wall nodes and with the start and target nodes applied
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => NODE_STATE.WALL)
  );
  grid[start.y][start.x] = NODE_STATE.START;
  grid[target.y][target.x] = NODE_STATE.TARGET;

  // Initialize an empty array for storing all the possible walls between each node in the grid
  const walls = [];

  // Loop through all the possible rows (excluding the edges) of the grid
  for (let y = 1; y < rows - 1; y++) {
    // Loop through all the possible columns (excluding the edges) of the grid
    for (let x = 1; x < cols - 1; x++) {
      if (y % 2 === 0 || x % 2 === 0) {
        // Skip the corner wall node
        if (y % 2 === 0 && x % 2 === 0) continue;
        // Add the wall to the array
        walls.push({ x, y });
      } else {
        // Add the node into an empty set and store its reference in the 2d array
        ref[y][x] = set.add({ x, y });
      }
    }
  }

  // Shuffle the walls array using the Fisher Yates method
  for (let i = walls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }

  // Loop through each of the wall in the shuffled order
  walls.forEach(({ x, y }) => {
    // Calculate the coordinates of neighbouring nodes divided by the current wall
    let [x1, y1, x2, y2] = [x - 1, y, x + 1, y];
    if (y % 2 === 0) [x1, y1, x2, y2] = [x, y - 1, x, y + 1];
    // Check if the neighbours belong to different distinct sets
    if (!set.connected(ref[y1][x1], ref[y2][x2])) {
      // Merge the sets containing the neighbours
      set.union(ref[y1][x1], ref[y2][x2]);
      // Check if the selected wall can be updated
      if (grid[y][x] === NODE_STATE.WALL) {
        // Push the node to the visualization order array with the empty tag
        order.push({ x, y, tag: NODE_STATE.EMPTY });
        // Update the final state of the empty node in the grid
        grid[y][x] = NODE_STATE.EMPTY;
      }
      // Check if the first neighbour has already been updated before
      if (grid[y1][x1] === NODE_STATE.WALL) {
        order.push({ x: x1, y: y1, tag: NODE_STATE.EMPTY });
        grid[y1][x1] = NODE_STATE.EMPTY;
      }
      // Check if the second neighbour has already been updated before
      if (grid[y2][x2] === NODE_STATE.WALL) {
        order.push({ x: x2, y: y2, tag: NODE_STATE.EMPTY });
        grid[y2][x2] = NODE_STATE.EMPTY;
      }
    }
  });

  // Return the visualization order array, and the final grid state after the maze generation process finished
  return { order, final: grid };
};

export default kruskalAlgorithm;
