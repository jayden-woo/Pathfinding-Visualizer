import FastPriorityQueue from "fastpriorityqueue";
import { COST, DX, DY, NODE_STATE } from "../../constants";
import { calculateHeuristic, reconstructPath } from "./helper";

const aStarAlgorithm = (start, target, grid, diagonal, heuristic) => {
  // Initialize variables and 2d array with state of each node
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const state = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      gCost: Infinity,
      hCost: Infinity,
      fCost: Infinity,
      opened: false,
      closed: false,
    }))
  );
  const order = [];
  let path = [];

  // Initialize the priority queue with custom comparator to define equality and relative order
  const open = new FastPriorityQueue((a, b) => {
    const stateA = state[a.y][a.x];
    const stateB = state[b.y][b.x];
    // Compare the fCost first
    if (stateA.fCost !== stateB.fCost) {
      return stateA.fCost < stateB.fCost;
    }
    // Break ties in fCost by comparing the hCost next
    if (stateA.hCost !== stateB.hCost) {
      return stateA.hCost < stateB.hCost;
    }
    // Compare the coordinates last to allow for equality check and subsequent removal of elements from the queue
    return a.x > b.x || a.y > b.y;
  });

  // Reset the gCost of the start node to 0 and mark it as queued before adding it to the open priority queue
  state[start.y][start.x].gCost = 0;
  state[start.y][start.x].opened = true;
  open.add(start);

  // Continue looping until no more node could be explored
  while (!open.isEmpty()) {
    // Remove the node with the highest priority in the priority queue
    const { x, y, prev } = open.poll();

    // Skip the current node if it has already been visited and closed
    if (state[y][x].closed) continue;

    // Close the current node and push it to the visualization order array with the explored tag
    state[y][x].closed = true;
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

      // Skip the neighbour if it has already been closed or if it is a wall
      if (node.closed || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Calculate the cost and the total gCost to reach the neighbour from the start node
      const cost = Math.abs(dx[i]) + Math.abs(dy[i]) > 1 ? COST.DIAGONAL : COST.ADJACENT;
      const gCost = state[y][x].gCost + cost;

      // Check if the neighbour has been added to the open queue before
      if (node.opened) {
        // Skip the neighbour if it had a lesser or equal gCost
        if (node.gCost <= gCost) continue;
        // Else remove it from the priority queue
        open.remove({ x: nextX, y: nextY });
      } else {
        // Mark the neighbour as being added
        node.opened = true;
        // Push it to the visualization order array with the queued tag
        order.push({ x: nextX, y: nextY, tag: NODE_STATE.QUEUED });
        // Calculate the heuristic cost for reaching the target node
        node.hCost = calculateHeuristic(nextX, nextY, target, heuristic);
      }

      // Update the gCost thus far for reaching the neighbour from the start node and then the total fCost as well
      node.gCost = gCost;
      node.fCost = gCost + node.hCost;

      // Add the neighbour into the open priority queue
      open.add({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Return the visualization order array and the array with the full path (or an empty array if no path exists)
  return { order, path };
};

export default aStarAlgorithm;
