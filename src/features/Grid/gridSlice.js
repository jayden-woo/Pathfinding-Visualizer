import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { NODE_STATE } from "../../constants";

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
  mouse: {
    clicking: false,
    actionState: null,
    prev: {
      x: 0,
      y: 0,
    },
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
            state: NODE_STATE.EMPTY,
          };
          if (x === state.start.x && y === state.start.y) {
            node.state = NODE_STATE.START;
          } else if (x === state.target.x && y === state.target.y) {
            node.state = NODE_STATE.TARGET;
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
    setMouseClick: (state, action) => {
      const { x, y, nextState } = action.payload;
      state.mouse.clicking = true;
      state.mouse.actionState = nextState;
      state.mouse.prev = { x, y };
      gridSlice.caseReducers.updateNodeState(state, action);
    },
    handleMouseMove: (state, action) => {
      const node = action.payload;
      if (!state.mouse.clicking) return;
      if (node !== state.mouse.prev) {
        state.mouse.prev = node;
        gridSlice.caseReducers.updateNodeState(state, action);
      }
    },
    setMouseLift: (state) => {
      state.mouse = initialState.mouse;
    },
    updateNodeState: (state, action) => {
      const { x, y } = action.payload;
      const prev = state.grid[y].row[x].state;
      if (prev === NODE_STATE.START || prev === NODE_STATE.TARGET) return;

      const next = state.mouse.actionState;
      if (next === NODE_STATE.START) {
        const { x: x0, y: y0 } = state.start;
        state.grid[y0].row[x0].state = NODE_STATE.EMPTY;
        state.start = { x, y };
      } else if (next === NODE_STATE.TARGET) {
        const { x: x0, y: y0 } = state.target;
        state.grid[y0].row[x0].state = NODE_STATE.EMPTY;
        state.target = { x, y };
      }
      state.grid[y].row[x].state = next;
    },
  },
});

export const {
  initGrid,
  updateDimension,
  setMouseClick,
  handleMouseMove,
  setMouseLift,
  updateNodeState,
} = gridSlice.actions;

export default gridSlice.reducer;
