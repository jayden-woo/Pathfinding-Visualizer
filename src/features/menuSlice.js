import { createSlice } from "@reduxjs/toolkit";
import { ALGORITHM_TYPES, DELAY, PATH_ALGORITHMS } from "../constants";

const initialState = {
  animationSkip: false,
  animationDelay: DELAY.DEFAULT,
  selectedAlgo: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
  algoType: ALGORITHM_TYPES.PATHFINDING,
  mobileDrawerOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateAnimationSkip: (state, action) => {
      state.animationSkip = action.payload;
    },
    updateAnimationDelay: (state, action) => {
      state.animationDelay = action.payload;
    },
    switchAlgo: (state, action) => {
      const { algo, type } = action.payload;
      state.selectedAlgo = algo;
      state.algoType = type;
    },
    toggleDrawer: (state, action) => {
      state.mobileDrawerOpen = action.payload || !state.mobileDrawerOpen;
    },
  },
});

export const { updateAnimationSkip, updateAnimationDelay, switchAlgo, toggleDrawer } =
  menuSlice.actions;

export default menuSlice.reducer;
