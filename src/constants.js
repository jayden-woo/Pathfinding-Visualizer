import Styles from "./styles/abstracts/_variables.scss";

// Screen breakpoint
export const SCREEN_BREAKPOINT = Number(Styles.screenBreakpoint.replace("px", ""));

// Node size
export const NODE_SMALL = Number(Styles.nodeSmallSize.replace("px", ""));
export const NODE_LARGE = Number(Styles.nodeLargeSize.replace("px", ""));

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

// Visualization delay time
export const DELAY = Object.freeze({
  SLOWEST: 400,
  SLOW: 300,
  MEDIUM: 200,
  FAST: 100,
  FASTEST: 20,
});
