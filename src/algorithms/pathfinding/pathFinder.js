import { PATH_ALGORITHMS } from "../../constants";
import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";

// Return the function corresponding to each pathfinding algorithm
const PathFinder = {
  [PATH_ALGORITHMS.DEPTH_FIRST_SEARCH]: depthFirstSearch,
  [PATH_ALGORITHMS.BREADTH_FIRST_SEARCH]: breadthFirstSearch,
};

export default PathFinder;
