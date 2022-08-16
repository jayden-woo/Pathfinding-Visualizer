// Helper function to trace the path found from the start to target node if it exist
// or return an empty array if no path is found
export const tracePathFound = (start, target, visited) => {
  // Start tracing from the target node
  const path = [];
  let node = target;

  // Loop through the visited order array from the back and find the previous nodes
  visited
    .slice()
    .reverse()
    .forEach(({ x, y, prev }) => {
      // Find the item in the array when the node was visited
      if (x === node.x && y === node.y) {
        // Add the node to the start of the path array and update the next node to look for
        path.unshift({ x, y });
        node = prev;
      }
    });

  // Return the full path found which will be an empty array if the target node was never reached
  return path;
};

// TO-DELETE:
export const temp = () => {};
