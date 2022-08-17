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

// TO-DELETE:
export const temp = () => {};
