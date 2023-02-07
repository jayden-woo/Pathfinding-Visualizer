import Styles from "./styles/_variables.scss";

// Component sizes
export const NAV_HEIGHT = 64;
export const DRAWER_WIDTH = 240;
export const SLIDER_WIDTH = 205;

// Grid sizes
export const GRID_SIZE = Object.freeze({
  MIN_WIDTH: 380,
  ROWS: Object.freeze({
    MIN: 15,
    MAX: 51,
  }),
  COLS: Object.freeze({
    MIN: 15,
    MAX: 51,
  }),
});

// Node sizes
export const NODE_SIZE = Object.freeze({
  SMALL: parseFloat(Styles.nodeSmall),
  LARGE: parseFloat(Styles.nodeLarge),
});

// App states
export const APP_STATE = Object.freeze({
  // When the app is allowing user to change the grid and algorithm configurations
  INTERACTIVE: "interactive",
  // When the app is running the visualization process
  VISUALIZING: "visualizing",
  // When the app is generating the maze
  GENERATING: "generating",
  // When the visualization process is being paused
  PAUSED: "paused",
  // When the app is done with the visualization process
  VISUALIZED: "visualized",
  // When the app is updating to instantly render the end state of another configuration
  UPDATING: "updating",
});

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

// Algorithm Types
export const ALGORITHM_TYPES = Object.freeze({
  PATHFINDING: "Pathfinding",
  GENERATION: "MazeGeneration",
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
  RECURSIVE_BACKTRACKING: "RecursiveBacktracking",
  RECURSIVE_DIVISION: "RecursiveDivision",
  KRUSKAL_ALGORITHM: "KruskalAlgorithm",
  PRIM_ALGORITHM: "PrimAlgorithm",
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

// Direction of bisection for the recursive division maze generation method
export const DIRECTION = Object.freeze({
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
});

// Visualization delay specifications
export const DELAY = Object.freeze({
  DEFAULT: 40,
  MIN: 0,
  MAX: 300,
  STEP: 5,
});
