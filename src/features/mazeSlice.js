import { createSlice } from "@reduxjs/toolkit";
import MazeGenerator from "../algorithms/maze/mazeGenerator";
import { MAZE_ALGORITHMS } from "../constants";

const initialState = {
  animation: true,
  algorithm: MAZE_ALGORITHMS.BASIC_RANDOM,
  order: [],
  maze: [],
};

const mazeSlice = createSlice({
  name: "maze",
  initialState,
  reducers: {
    updateMazeAnimation: (state, action) => {
      state.animation = action.payload;
      // TO-DELETE:
      console.log(`${state.animation ? "Enabled" : "Disabled"} Maze Animation!`);
    },
    setMazeAlgorithm: (state, action) => {
      state.algorithm = action.payload;
      // TO-DELETE:
      console.log(`Chosen "${state.algorithm}" for the Maze Generation Algorithm!`);
    },
    resetMazeGenerator: (state) => {
      state.order = [];
      state.maze = [];
    },
    runMazeGenerator: (state, action) => {
      // TO-DELETE:
      console.log(`Running "${state.algorithm}" Maze Generation Algorithm...`);
      const { start, target, grid } = action.payload;
      const { order, final } = MazeGenerator[state.algorithm](
        start,
        target,
        grid.length,
        grid[0].length
      );
      // TO-DELETE:
      console.log(order, final);
      state.order = order;
      state.maze = final;
    },
  },
});

export const { updateMazeAnimation, setMazeAlgorithm, resetMazeGenerator, runMazeGenerator } =
  mazeSlice.actions;

export default mazeSlice.reducer;
