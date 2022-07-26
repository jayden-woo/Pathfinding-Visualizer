import { createSlice } from "@reduxjs/toolkit";
import { tracePathFound } from "../../algorithms/pathfinding/helper";
import PathFinder from "../../algorithms/pathfinding/pathFinder";
import { PATH_ALGORITHMS } from "../../constants";

const initialState = {
  algorithm: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
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
      state.visited = PathFinder[state.algorithm](start, target, grid);
      state.path = tracePathFound(start, target, state.visited);
      state.time = performance.now() - startTime;
    },
  },
});

export const { setPathAlgorithm, resetPathFinder, runPathFinder } = pathfindingSlice.actions;

export default pathfindingSlice.reducer;
