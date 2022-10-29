import { MAZE_ALGORITHMS } from "../../constants";
import basicRandom from "./basicRandom";
import kruskalAlgorithm from "./kruskalAlgorithm";
import primAlgorithm from "./primAlgorithm";
import recursiveDivision from "./recursiveDivision";

// Return the function corresponding to each maze generation algorithm
const MazeGenerator = {
  [MAZE_ALGORITHMS.BASIC_RANDOM]: basicRandom,
  [MAZE_ALGORITHMS.KRUSKAL_ALGORITHM]: kruskalAlgorithm,
  [MAZE_ALGORITHMS.PRIM_ALGORITHM]: primAlgorithm,
  [MAZE_ALGORITHMS.RECURSIVE_DIVISION]: recursiveDivision,
};

export default MazeGenerator;
