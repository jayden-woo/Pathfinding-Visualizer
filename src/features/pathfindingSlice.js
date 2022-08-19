import { createSlice } from "@reduxjs/toolkit";
import { reconstructPath } from "../algorithms/pathfinding/helper";
import PathFinder from "../algorithms/pathfinding/pathFinder";
import { HEURISTIC, PATH_ALGORITHMS } from "../constants";

const initialState = {
  algorithm: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
  heuristic: HEURISTIC.MANHATTAN,
  diagonal: false,
  visited: [],
  path: [],
  time: 0,
};

const pathfindingSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPathAlgorithm: (state, action) => {
      state.algorithm = action.payload;
      // TO-DELETE:
      console.log(`Chosen "${state.algorithm}" for the Pathfinding Algorithm!`);
    },
    setHeuristic: (state, action) => {
      state.heuristic = action.payload;
      // TO-DELETE:
      console.log(`Chosen "${state.heuristic}" for the Pathfinding Heuristic!`);
    },
    setDiagonalTraversal: (state, action) => {
      state.diagonal = action.payload;
      // TO-DELETE:
      console.log(`${state.diagonal ? "Allowed" : "Disabled"} diagonal path traversal!`);
    },
    resetPathFinder: (state) => {
      state.visited = [];
      state.path = [];
      state.time = 0;
    },
    runPathFinder: (state, action) => {
      // TO-DELETE:
      console.log(`Running "${state.algorithm}" Pathfinding Algorithm...`);
      if (!state.algorithm) return;
      const { start, target, grid } = action.payload;
      const startTime = performance.now();
      state.visited = PathFinder[state.algorithm](
        start,
        target,
        grid,
        state.diagonal,
        state.heuristic
      );
      state.path = reconstructPath(target, state.visited);
      state.time = performance.now() - startTime;
    },
  },
});

export const {
  setPathAlgorithm,
  setHeuristic,
  setDiagonalTraversal,
  resetPathFinder,
  runPathFinder,
} = pathfindingSlice.actions;

export default pathfindingSlice.reducer;
