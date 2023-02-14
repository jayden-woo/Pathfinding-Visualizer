import { createSlice } from "@reduxjs/toolkit";
import MazeGenerator from "../algorithms/maze/mazeGenerator";
import { MAZE_ALGORITHMS } from "../constants";

const initialState = {
  algorithm: MAZE_ALGORITHMS.BASIC_RANDOM,
  order: [],
  maze: [],
};

const mazeSlice = createSlice({
  name: "maze",
  initialState,
  reducers: {
    setMazeAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    resetMazeGenerator: (state) => {
      state.order = [];
      state.maze = [];
    },
    runMazeGenerator: (state, action) => {
      const { start, target, grid } = action.payload;
      const { order, final } = MazeGenerator[state.algorithm](
        start,
        target,
        grid.length,
        grid[0].length
      );
      state.order = order;
      state.maze = final;
    },
  },
});

export const { setMazeAlgorithm, resetMazeGenerator, runMazeGenerator } = mazeSlice.actions;

export default mazeSlice.reducer;
