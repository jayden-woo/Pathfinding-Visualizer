import { DX, DY, NODE_STATE } from "../../constants";

const depthFirstSearch = (start, target, grid, diagonal) => {
  // Initialize variables and 2d array with visited state of each node
  const rows = grid.length;
  const cols = grid[0].length;
  const dx = diagonal ? DX.EIGHT_DIRECTIONS : DX.FOUR_DIRECTIONS;
  const dy = diagonal ? DY.EIGHT_DIRECTIONS : DY.FOUR_DIRECTIONS;
  const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
  const stack = [];
  const order = [];

  // Push the start node and continue until no more node could be explored
  stack.push(start);
  while (stack.length) {
    // Pop the top element in the stack
    const { x, y, prev } = stack.pop();

    // Skip current node if it has already been visited
    if (visited[y][x]) continue;

    // Mark and add current node to the array with the order of nodes being visited
    visited[y][x] = true;
    order.push({ x, y, prev });

    // Check if reached the target node
    if (x === target.x && y === target.y) break;

    // Loop through all the possible neighbours of current node
    for (let i = dx.length - 1; i >= 0; i--) {
      // Calculate the coordinates of the neighbour
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      // Skip the neighbour if it is out of the grid boundaries
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) continue;

      // Skip the neighbour if it has already been visited or if it is a wall
      if (visited[nextY][nextX] || grid[nextY][nextX] === NODE_STATE.WALL) continue;

      // Push the neighbour to the stack otherwise
      stack.push({ x: nextX, y: nextY, prev: { x, y, prev } });
    }
  }

  // Return the array with the order of each node being visited
  return order;
};

export default depthFirstSearch;
