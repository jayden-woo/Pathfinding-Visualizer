import { DX, DY, NODE_STATE } from "../../constants";
import { reconstructPath } from "./helper";

const depthFirstSearch = (start, target, grid, diagonal) => {
  // Initialize variables and 2d array with queued and visited state of each node
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const state = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      queued: false,
      visited: false,
    }))
  );
  const stack = [];
  const order = [];
  let path = [];

  // Push the start node to the stack and mark it as queued
  stack.push(start);
  state[start.y][start.x].queued = true;

  // Continue looping until no more node could be explored
  while (stack.length) {
    // Pop the top element in the stack
    const { x, y, prev } = stack.pop();

    // Skip current node if it has already been visited
    if (state[y][x].visited) continue;

    // Mark the current node as visited and push it to the visualization order array with the explored tag
    state[y][x].visited = true;
    order.push({ x, y, tag: NODE_STATE.EXPLORED });

    // Check if reached the target node
    if (x === target.x && y === target.y) {
      // Reconstruct and update the path array with the full path before exiting the loop
      path = reconstructPath(prev);
      break;
    }

    // Loop through all the possible neighbours of current node
    for (let i = dx.length - 1; i >= 0; i--) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Skip the neighbour if it has already been visited or if it is a wall
      if (state[nextY][nextX].visited || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Check if the neighbour has been queued before
      if (!state[nextY][nextX].queued) {
        // Mark the neighbour as being queued and push it to the visualization order array with the queued tag
        state[nextY][nextX].queued = true;
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.QUEUED });
      }

      // Push the neighbour to the stack with the previous node leading to it
      stack.push({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Return the visualization order array and the array with the full path (or an empty array if no path exists)
  return { order, path };
};

export default depthFirstSearch;
