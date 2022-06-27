import { createSlice } from "@reduxjs/toolkit";
import { tracePathFound } from "../../algorithms/pathfinding/helper";
import PathFinder from "../../algorithms/pathfinding/pathFinder";

const initialState = {
  algorithm: null,
  visited: [],
  path: [],
};

const pathfindingSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPathAlgorithm: (state, action) => {
      state.algorithm = action.payload;
      console.log(`Chosen "${state.algorithm}" for the Pathfinding Algorithm!`);
    },
    runPathFinder: (state, action) => {
      console.log(`Running "${state.algorithm}" Pathfinding Algorithm...`);
      if (!state.algorithm) return;
      const { start, target, grid } = action.payload;
      state.visited = PathFinder[state.algorithm](start, target, grid);
      state.path = tracePathFound(start, target, state.visited);
    },
  },
});

export const { setPathAlgorithm, runPathFinder } = pathfindingSlice.actions;

export default pathfindingSlice.reducer;
