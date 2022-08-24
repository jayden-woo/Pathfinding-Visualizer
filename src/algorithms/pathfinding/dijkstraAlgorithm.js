import FastPriorityQueue from "fastpriorityqueue";
import { COST, DX, DY, NODE_STATE } from "../../constants";
import { reconstructPath } from "./helper";

const dijkstraAlgorithm = (start, target, grid, diagonal) => {
  // Initialize variables and 2d array with state of each node
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const state = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      distance: Infinity,
      queued: false,
      visited: false,
    }))
  );
  const order = [];
  let path = [];

  // Initialize the priority queue with custom comparator to define equality and relative order
  const queue = new FastPriorityQueue((a, b) => {
    const stateA = state[a.y][a.x];
    const stateB = state[b.y][b.x];
    // Compare the distance first
    if (stateA.distance !== stateB.distance) {
      return stateA.distance < stateB.distance;
    }
    // Compare the coordinates next to allow for equality check and subsequent removal of elements from the queue
    return a.x > b.x || a.y > b.y;
  });

  // Reset the distance of the start node to 0 and mark it as queued before adding it to the priority queue
  state[start.y][start.x].distance = 0;
  state[start.y][start.x].queued = true;
  queue.add(start);

  // Continue looping until no more node could be explored
  while (!queue.isEmpty()) {
    // Remove the node with the highest priority in the priority queue
    const { x, y, prev } = queue.poll();

    // Skip the current node if it has already been visited
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

    // Loop through all the possible neighbours of the current node
    for (let i = 0; i < dx.length; i++) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Get the node state of the neighbour
      const node = state[nextY][nextX];

      // Skip the neighbour if it has already been visited or if it is a wall
      if (node.visited || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Calculate the total distance to reach the neighbour from the start node through this current node
      const step = Math.abs(dx[i]) + Math.abs(dy[i]) > 1 ? COST.DIAGONAL : COST.ADJACENT;
      const distance = state[y][x].distance + step;

      // Check if the neighbour has been added to the priority queue before
      if (node.queued) {
        // Skip the neighbour if it had a lesser or equal distance
        if (node.distance <= distance) continue;
        // Else remove it from the priority queue
        queue.remove({ x: nextX, y: nextY });
      } else {
        // Mark the neighbour as being added
        node.queued = true;
        // Push it to the visualization order array with the queued tag
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.QUEUED });
      }

      // Update the distance thus far for reaching the neighbour from the start node through this current node
      node.distance = distance;

      // Add the neighbour into the priority queue
      queue.add({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Return the visualization order array and the array with the full path (or an empty array if no path exists)
  return { order, path };
};

export default dijkstraAlgorithm;
