import FastPriorityQueue from "fastpriorityqueue";
import { DX, DY, NODE_STATE } from "../../constants";
import { calculateHeuristic, reconstructPath } from "./helper";

const greedyBestFirstSearch = (start, target, grid, diagonal, heuristic) => {
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
  const order = [];

  // Initialize priority queue with custom comparator to check relative order
  const queue = new FastPriorityQueue((a, b) => a.distance < b.distance);

  // Add the start node to the priority queue and mark it as queued
  queue.add(start);
  state[start.y][start.x].queued = true;

  // Continue looping until no more node could be explored
  while (!queue.isEmpty()) {
    // Remove the node with the highest priority in the priority queue
    const { x, y, prev } = queue.poll();

    // Skip current node if it has already been visited
    if (state[y][x].visited) continue;

    // Mark the current node as visited and push it to the visualization order array with the explored tag
    state[y][x].visited = true;
    order.push({ x, y, tag: NODE_STATE.EXPLORED });

    // Loop through all the possible neighbours of current node
    for (let i = 0; i < dx.length; i++) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Skip the neighbour if it has already been visited or if it is a wall
      if (state[nextY][nextX].visited || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Check if the neighbour is the target node
      if (nextX === target.x && nextY === target.y) {
        // Push the neighbour to the visualization order array with the explored tag
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.EXPLORED });
        // Reconstruct the full path and return it with the visualization order array
        return { order, path: reconstructPath({ x: nextX, y: nextY, prev: { x, y, prev } }) };
      }

      // Check if the neighbour has been queued before
      if (!state[nextY][nextX].queued) {
        // Mark the neighbour as being queued
        state[nextY][nextX].queued = true;
        // Push it to the visualization order array with the queued tag
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.QUEUED });
        // Add the neighbour into the priority queue with the distance as its heuristics
        queue.add({
          x: nextX,
          y: nextY,
          prev: { x, y, prev },
          distance: calculateHeuristic(nextX, nextY, target, heuristic),
        });
      }
    }
  }

  // Return the visualization order array and an empty array for the path as no path exists
  return { order, path: [] };
};

export default greedyBestFirstSearch;
