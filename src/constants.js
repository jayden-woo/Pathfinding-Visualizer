// Node size
export const NODE_SIZE = 34;

// Node states
export const NODE_STATE = Object.freeze({
  START: "start",
  TARGET: "target",
  EMPTY: "empty",
  WALL: "wall",
  QUEUED: "queued",
  EXPLORED: "explored",
  PATH: "path",
});

// Mouse buttons
export const MOUSE_BUTTON = Object.freeze({
  LEFT: 1,
  RIGHT: 2,
});

// Pathfinding algorithms
export const PATH_ALGORITHMS = Object.freeze({
  DEPTH_FIRST_SEARCH: "DepthFirstSearch",
  BREADTH_FIRST_SEARCH: "BreadthFirstSearch",
});

// Node neighbours index difference array
export const DX = Object.freeze([1, 0, -1, 0]);
export const DY = Object.freeze([0, 1, 0, -1]);
