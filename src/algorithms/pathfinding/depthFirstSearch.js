import { DX, DY, NODE_STATE } from "../../constants";
import { reconstructPath } from "./helper";

const depthFirstSearch = (start, target, grid, diagonal) => {
  // Initialize variables and arrays
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const stack = [];
  const order = [];
  let path = [];
  // Initialize a 2d array with the state of each node
  const state = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      queued: false,
      visited: false,
    }))
  );
  // Initialize an object to store the final state of the grid after finished with pathfinding
  const final = {
    grid: grid.map((row) => [...row]),
    visited: 0,
    path: 0,
  };

  // Push the start node to the stack and mark it as queued
  stack.push(start);
  state[start.y][start.x].queued = true;

  // Continue looping until no more node could be explored
  while (stack.length) {
    // Pop the top element in the stack
    const { x, y, prev } = stack.pop();

    // Skip the current node if it has already been visited
    if (state[y][x].visited) continue;

    // Mark the current node as visited and push it to the visualization order array with the explored tag
    state[y][x].visited = true;
    order.push({ x, y, tag: NODE_STATE.EXPLORED });

    // Update the final state of the explored node in the grid as well as the amount of nodes visited in total
    final.grid[y][x] = NODE_STATE.EXPLORED;
    final.visited += 1;

    // Check if reached the target node
    if (x === target.x && y === target.y) {
      // Reconstruct and update the path array with the full path before exiting the loop
      path = reconstructPath(prev, final.grid);
      break;
    }

    // Loop through all the possible neighbours of the current node
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
        // Mark the neighbour as being queued
        state[nextY][nextX].queued = true;
        // Push it to the visualization order array with the queued tag
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.QUEUED });
        // Update the final state of the queued node in the grid
        final.grid[nextY][nextX] = NODE_STATE.QUEUED;
      }

      // Push the neighbour to the stack with the previous node leading to it
      stack.push({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Reset the start and the target node in final grid state back to its original state
  final.grid[start.y][start.x] = NODE_STATE.START;
  final.grid[target.y][target.x] = NODE_STATE.TARGET;

  // Scale the number of visited nodes back by 1 to compensate for including the start node
  final.visited -= 1;
  // Check if a path exists for the current grid configuration
  if (path.length) {
    // Scale the number of visited nodes back by another 1 to compensate for including the target node
    final.visited -= 1;
    // Update the path length and scale it back by 1 to compensate for including the target node as well
    final.path = path.length - 1;
  }

  // Return the visualization order array, the array with the full path (or an empty array if no path exists),
  // and the final state of the grid after the pathfinding process is done
  return { order, path, final };
};

export default depthFirstSearch;
