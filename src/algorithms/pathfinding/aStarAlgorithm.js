import FastPriorityQueue from "fastpriorityqueue";
import { COST, DX, DY, NODE_STATE } from "../../constants";
import { calculateHeuristic } from "./helper";

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
      closed: false,
    }))
  );
  const order = [];

  // Initialize priority queue with custom comparator to define equality and relative order
  const open = new FastPriorityQueue((a, b) => {
    if (a.x === b.x && a.y === b.y) return false;
    if (state[a.y][a.x].fCost !== state[b.y][b.x].fCost) {
      return state[a.y][a.x].fCost < state[b.y][b.x].fCost;
    }
    return state[a.y][a.x].hCost < state[b.y][b.x].hCost;
  });

  // Reset the gCost of start node to 0 and add the start to the open priority queue
  state[start.y][start.x].gCost = 0;
  open.add(start);

  // Continue looping until no more node could be explored
  while (!open.isEmpty()) {
    // Remove the node with the highest priority in the priority queue
    const { x, y, prev } = open.poll();

    // Skip current node if it has already been visited and closed
    if (state[y][x].closed) continue;

    // Close and add current node to the array with the order of nodes being visited
    state[y][x].closed = true;
    order.push({ x, y, prev });

    // Check if the target node is reached
    if (x === target.x && y === target.y) break;

    // Loop through all the possible neighbours of current node
    for (let i = 0; i < dx.length; i++) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Calculate the cost and the total gCost to reach the neighbour from the start node
      const cost = Math.abs(dx[i]) + Math.abs(dy[i]) > 1 ? COST.DIAGONAL : COST.ADJACENT;
      const gCost = state[y][x].gCost + cost;

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Skip the neighbour if it has already been closed or if it is a wall
      if (state[nextY][nextX].closed || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Skip the neighbour if it has been visited before and has the same or higher gCost
      if (state[nextY][nextX].gCost !== Infinity && state[nextY][nextX].gCost <= gCost) continue;

      // Calculate the heuristic cost for reaching the target node if the neighbour has not been visited before
      if (state[nextY][nextX].gCost === Infinity) {
        state[nextY][nextX].hCost = calculateHeuristic(nextX, nextY, target, heuristic);
      }

      // Remove the neighbour from the priority queue if it had a higher gCost
      if (state[nextY][nextX].gCost > gCost) {
        open.remove({ x: nextX, y: nextY });
      }

      // Update the gCost for reaching the neighbour and the total fCost as well
      state[nextY][nextX].gCost = gCost;
      state[nextY][nextX].fCost = gCost + state[nextY][nextX].hCost;

      // Add the neighbour into the open priority queue
      open.add({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Return the array with the order of each node being visited
  return order;
};

export default aStarAlgorithm;
