import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { NODE_EMPTY, NODE_START, NODE_TARGET } from "../../constants";

const initialState = {
  dimension: {
    rows: 0,
    cols: 0,
  },
  grid: [],
  start: {
    x: 0,
    y: 0,
  },
  target: {
    x: 0,
    y: 0,
  },
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    initGrid: (state) => {
      state.grid = [];
      for (let y = 0; y < state.dimension.rows; y++) {
        const rowID = uuidv4();
        const row = [];
        for (let x = 0; x < state.dimension.cols; x++) {
          const nodeID = uuidv4();
          const node = {
            nodeID,
            state: NODE_EMPTY,
          };
          if (x === state.start.x && y === state.start.y) {
            node.state = NODE_START;
          } else if (x === state.target.x && y === state.target.y) {
            node.state = NODE_TARGET;
          }
          row.push(node);
        }
        state.grid.push({
          rowID,
          row,
        });
      }
    },
    updateDimension: (state, action) => {
      const { rows, cols } = action.payload;
      state.dimension = {
        rows,
        cols,
      };
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
  },
});

console.log(gridSlice);

export default gridSlice.reducer;

export const { updateDimension } = gridSlice.actions;
