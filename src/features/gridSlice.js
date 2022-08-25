import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { NODE_STATE } from "../constants";

const initialState = {
  dimension: {
    rows: 0,
    cols: 0,
  },
  grid: [],
  gridID: [],
  start: {
    x: 0,
    y: 0,
  },
  target: {
    x: 0,
    y: 0,
  },
  mouse: {
    clicking: false,
    actionState: null,
    prev: {
      x: 0,
      y: 0,
    },
  },
  counter: {
    visited: 0,
    path: 0,
  },
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    initGrid: (state) => {
      state.grid = [];
      state.gridID = [];
      for (let y = 0; y < state.dimension.rows; y++) {
        const row = [];
        const rowID = [];
        for (let x = 0; x < state.dimension.cols; x++) {
          rowID.push(uuidv4());
          if (x === state.start.x && y === state.start.y) {
            row.push(NODE_STATE.START);
          } else if (x === state.target.x && y === state.target.y) {
            row.push(NODE_STATE.TARGET);
          } else {
            row.push(NODE_STATE.EMPTY);
          }
        }
        state.grid.push(row);
        state.gridID.push(rowID);
      }
    },
    replaceGrid: (state, action) => {
      // Replace the grid with the new grid state and update the visited nodes and path length counter
      const { grid, visited, path } = action.payload;
      state.grid = grid;
      state.counter.visited = visited;
      state.counter.path = path;
    },
    resetGrid: (state, action) => {
      const all = action.payload;
      for (let y = 0; y < state.dimension.rows; y++) {
        for (let x = 0; x < state.dimension.cols; x++) {
          const node = state.grid[y][x];
          // Skip if the node is the start or target node
          if (node === NODE_STATE.START || node === NODE_STATE.TARGET) continue;
          // Skip if only resetting path nodes and if the node is a wall node
          if (!all && node === NODE_STATE.WALL) continue;
          // Reset the node to an empty node
          state.grid[y][x] = NODE_STATE.EMPTY;
        }
      }
      // Reset the visited nodes and path length counter
      state.counter = initialState.counter;
    },
    updateDimension: (state, action) => {
      const { rows, cols } = action.payload;
      state.dimension = {
        rows,
        cols,
      };
      // TO-DELETE:
      console.log("Grid Dimension:", state.dimension);
      state.start = {
        x: 2,
        y: 2,
      };
      state.target = {
        x: state.dimension.cols - 3,
        y: state.dimension.rows - 3,
      };
      gridSlice.caseReducers.initGrid(state);
    },
    handleMouseClick: (state, action) => {
      const { x, y, nextState } = action.payload;
      state.mouse.clicking = true;
      state.mouse.actionState = nextState;
      state.mouse.prev = { x, y };
      gridSlice.caseReducers.updateUserNodeState(state, action);
    },
    handleMouseMove: (state, action) => {
      const node = action.payload;
      if (!state.mouse.clicking) return;
      if (node !== state.mouse.prev) {
        state.mouse.prev = node;
        gridSlice.caseReducers.updateUserNodeState(state, action);
      }
    },
    handleMouseLift: (state) => {
      state.mouse = initialState.mouse;
    },
    // Update node state according to user actions
    updateUserNodeState: (state, action) => {
      const { x, y } = action.payload;
      const prev = state.grid[y][x];
      // Skip accidental override of start and target node
      if (prev === NODE_STATE.START || prev === NODE_STATE.TARGET) return;
      // Get the current user action state
      const next = state.mouse.actionState;
      // Reset the old start node to empty state and update the start node to the new coordinates
      if (next === NODE_STATE.START) {
        const { x: x0, y: y0 } = state.start;
        state.grid[y0][x0] = NODE_STATE.EMPTY;
        state.start = { x, y };
      }
      // Reset the old target node to empty state and update the target node to the new coordinates
      else if (next === NODE_STATE.TARGET) {
        const { x: x0, y: y0 } = state.target;
        state.grid[y0][x0] = NODE_STATE.EMPTY;
        state.target = { x, y };
      }
      // Update the node to the next given state
      state.grid[y][x] = next;
    },
    // Update node state according to visualization of algorithms
    updateNodeState: (state, action) => {
      const { x, y, tag } = action.payload;
      const prev = state.grid[y][x];
      // Skip visualizing repeated state or the start and target node
      if (tag === prev || prev === NODE_STATE.START || prev === NODE_STATE.TARGET) return;
      // Increment the visited nodes counter if the node is updated to the explored state
      if (tag === NODE_STATE.EXPLORED) {
        state.counter.visited += 1;
      }
      // Increment the path length counter if the node is updated to the path state
      else if (tag === NODE_STATE.PATH) {
        state.counter.path += 1;
      }
      // Update the node to the next given state according to its given tag
      state.grid[y][x] = tag;
    },
  },
});

export const {
  replaceGrid,
  resetGrid,
  updateDimension,
  handleMouseClick,
  handleMouseMove,
  handleMouseLift,
  updateNodeState,
} = gridSlice.actions;

export default gridSlice.reducer;
