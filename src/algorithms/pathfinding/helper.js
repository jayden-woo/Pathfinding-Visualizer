import { COST, DIAGONAL_DISTANCE, HEURISTIC } from "../../constants";

// Helper function to trace the path found from the start to target node if it exist
// or return an empty array if no path is found
export const reconstructPath = (target, visited) => {
  // Start tracing from the last visited node
  const path = [];
  let node = visited ? visited[visited.length - 1] : undefined;

  // Return an empty array if no node was visited or if the target node was never reached
  if (node === undefined || node.x !== target.x || node.y !== target.y) return [];

  // Loop through each previous node from the last node
  while (node !== undefined) {
    // Add the node to the start of the path array and update the node to the previous of current node
    path.unshift(node);
    node = node.prev;
  }

  // Return the full path found
  return path;
};

// Helper heuristic function to estimate the cost of reaching the target node from the current node
export const calculateHeuristic = (x, y, target, heuristic) => {
  // Calculate the absolute difference in the x and y coordinates
  const dx = Math.abs(target.x - x);
  const dy = Math.abs(target.y - y);
  let distance;

  // Check which heuristic function was selected
  switch (heuristic) {
    // Calculate the Manhattan distance of target node from given node
    case HEURISTIC.MANHATTAN:
      distance = dx + dy;
      break;
    // Calculate the Euclidean distance of target node from given node
    case HEURISTIC.EUCLIDEAN:
      distance = Math.sqrt(dx ** 2 + dy ** 2);
      break;
    // Calculate the Chebyshev distance of target node from given node
    case HEURISTIC.CHEBYSHEV:
      distance = Math.max(dx, dy);
      break;
    // Calculate the Octile distance of target node from given node
    case HEURISTIC.OCTILE:
      distance = Math.min(dx, dy) * DIAGONAL_DISTANCE + Math.max(dx, dy) - Math.min(dx, dy);
      break;
    // Set a default distance of 0 to avoid overestimating the heuristic
    default:
      distance = 0;
      break;
  }

  // Multiply the distance by the cost of moving and round it to the nearest integer for easier comparison
  return Math.round(distance * COST.ADJACENT);
};
