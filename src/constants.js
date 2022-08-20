import Styles from "./styles/abstracts/_variables.scss";

// Screen breakpoint
export const SCREEN_BREAKPOINT = Number(Styles.screenBreakpoint.replace("px", ""));

// Component sizes
export const NAV_HEIGHT = 64;
export const DRAWER_WIDTH = 240;
export const SLIDER_WIDTH = 205;

// Node size
export const NODE_SMALL = Number(Styles.nodeSmallSize.replace("px", ""));
export const NODE_LARGE = Number(Styles.nodeLargeSize.replace("px", ""));

// Maximum amount of rows and columns in the grid
export const MAX_ROWS = 30;
export const MAX_COLS = 40;

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
  GREEDY_BEST_FIRST_SEARCH: "GreedyBestFirstSearch",
  A_STAR_ALGORITHM: "AStarAlgorithm",
  DIJKSTRA_ALGORITHM: "DijkstraAlgorithm",
});

// Maze generation algorithms
export const MAZE_ALGORITHMS = Object.freeze({
  BASIC_RANDOM: "BasicRandom",
  RECURSIVE_DIVISION: "RecursiveDivision",
});

// Heuristics function
export const HEURISTIC = Object.freeze({
  MANHATTAN: "Manhattan",
  EUCLIDEAN: "Euclidean",
  CHEBYSHEV: "Chebyshev",
  OCTILE: "Octile",
});

// Node neighbours index difference array
export const DX = Object.freeze({
  FOUR_DIRECTIONS: Object.freeze([1, 0, -1, 0]),
  EIGHT_DIRECTIONS: Object.freeze([1, 1, 0, -1, -1, -1, 0, 1]),
});
export const DY = Object.freeze({
  FOUR_DIRECTIONS: Object.freeze([0, 1, 0, -1]),
  EIGHT_DIRECTIONS: Object.freeze([0, 1, 1, 1, 0, -1, -1, -1]),
});

// Assume a rounded value of sqrt(2) for unit diagonal distance to try and
// avoid using the expensive square root operation
export const DIAGONAL_DISTANCE = 1.414;

// Cost of traversing to neighbouring nodes
export const COST = Object.freeze({
  ADJACENT: 10,
  DIAGONAL: 14,
});

// Visualization delay specifications
export const DELAY = Object.freeze({
  DEFAULT: 120,
  STEP: 20,
  MIN: 20,
  MAX: 300,
});
