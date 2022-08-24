import { PATH_ALGORITHMS } from "../../constants";
import aStarAlgorithm from "./aStarAlgorithm";
import breadthFirstSearch from "./breadthFirstSearch";
import depthFirstSearch from "./depthFirstSearch";
import dijkstraAlgorithm from "./dijkstraAlgorithm";
import greedyBestFirstSearch from "./greedyBestFirstSearch";

// Return the function corresponding to each pathfinding algorithm
const PathFinder = {
  [PATH_ALGORITHMS.A_STAR_ALGORITHM]: aStarAlgorithm,
  [PATH_ALGORITHMS.BREADTH_FIRST_SEARCH]: breadthFirstSearch,
  [PATH_ALGORITHMS.DEPTH_FIRST_SEARCH]: depthFirstSearch,
  [PATH_ALGORITHMS.DIJKSTRA_ALGORITHM]: dijkstraAlgorithm,
  [PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH]: greedyBestFirstSearch,
};

export default PathFinder;
