import { createSlice } from "@reduxjs/toolkit";
import PathFinder from "../algorithms/pathfinding/pathFinder";
import { HEURISTIC, PATH_ALGORITHMS } from "../constants";

const initialState = {
  algorithm: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
  heuristic: HEURISTIC.MANHATTAN,
  diagonal: false,
  visited: [],
  path: [],
  final: {
    grid: [],
    visited: 0,
    path: 0,
  },
  time: 0,
};

const pathfindingSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPathAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    setHeuristic: (state, action) => {
      state.heuristic = action.payload;
    },
    setDiagonalTraversal: (state, action) => {
      state.diagonal = action.payload;
    },
    resetPathFinder: (state) => {
      state.visited = [];
      state.path = [];
      state.final = initialState.final;
      state.time = 0;
    },
    runPathFinder: (state, action) => {
      if (!state.algorithm) return;
      const { start, target, grid } = action.payload;
      const startTime = performance.now();
      const { order, path, final } = PathFinder[state.algorithm](
        start,
        target,
        grid,
        state.diagonal,
        state.heuristic
      );
      state.visited = order;
      state.path = path;
      state.final = final;
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
