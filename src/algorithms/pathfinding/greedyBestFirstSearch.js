import FastPriorityQueue from "fastpriorityqueue";
import { DX, DY, NODE_STATE } from "../../constants";
import { calculateHeuristic } from "./helper";

const greedyBestFirstSearch = (start, target, grid, diagonal, heuristic) => {
  // Initialize variables and 2d array with visited state of each node
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
  const order = [];

  // Initialize priority queue with custom comparator to check relative order
  const queue = new FastPriorityQueue((a, b) => a.distance < b.distance);

  // Add the start node to the priority queue and continue until no more node could be explored
  queue.add(start);
  while (!queue.isEmpty()) {
    // Remove the node with the highest priority in the priority queue
    const { x, y, prev } = queue.poll();

    // Skip current node if it has already been visited
    if (visited[y][x]) continue;

    // Mark and add current node to the array with the order of nodes being visited
    visited[y][x] = true;
    order.push({ x, y, prev });

    // Loop through all the possible neighbours of current node
    for (let i = 0; i < dx.length; i++) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Skip the neighbour if it has already been visited or if it is a wall
      if (visited[nextY][nextX] || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Add the target node to the order array and return it if the neighbour is the target node
      if (nextX === target.x && nextY === target.y) {
        order.push({ x: nextX, y: nextY, prev: { x, y, prev } });
        return order;
      }

      // Add the neighbour into the priority queue with the distance as its heuristics
      queue.add({
        x: nextX,
        y: nextY,
        prev: { x, y, prev },
        distance: calculateHeuristic(nextX, nextY, target, heuristic),
      });
    }
  }

  // Return the array with the order of each node being visited
  return order;
};

export default greedyBestFirstSearch;
