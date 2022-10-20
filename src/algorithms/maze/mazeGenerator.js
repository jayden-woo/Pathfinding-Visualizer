import { MAZE_ALGORITHMS } from "../../constants";
import basicRandom from "./basicRandom";
import recursiveDivision from "./recursiveDivision";

// Return the function corresponding to each maze generation algorithm
const MazeGenerator = {
  [MAZE_ALGORITHMS.BASIC_RANDOM]: basicRandom,
  [MAZE_ALGORITHMS.RECURSIVE_DIVISION]: recursiveDivision,
};

export default MazeGenerator;
