import Styles from "./styles/abstracts/_variables.scss";

// Screen breakpoint
export const SCREEN_BREAKPOINT = Number(Styles.screenBreakpoint.replace("px", ""));

// Component sizes
export const NAV_HEIGHT = 64;
export const DRAWER_WIDTH = 240;

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
