import { createSlice } from "@reduxjs/toolkit";
import { ALGORITHM_TYPES, DELAY, PATH_ALGORITHMS } from "../constants";

const initialState = {
  animationDelay: DELAY.DEFAULT,
  selectedAlgo: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
  algoType: ALGORITHM_TYPES.PATHFINDING,
  mobileDrawerOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateAnimationDelay: (state, action) => {
      // TO-DELETE:
      console.log("Animation Delay updated to", action.payload);
      state.animationDelay = action.payload;
    },
    switchAlgo: (state, action) => {
      const { algo, type } = action.payload;
      // TO-DELETE:
      console.log("Menu Selected Algo State changed to", algo);
      state.selectedAlgo = algo;
      state.algoType = type;
    },
    toggleDrawer: (state, action) => {
      state.mobileDrawerOpen = action.payload || !state.mobileDrawerOpen;
      // TO-DELETE:
      console.log(state.mobileDrawerOpen ? "Mobile menu opened!" : "Mobile menu closed!");
    },
  },
});

export const { updateAnimationDelay, switchAlgo, toggleDrawer } = menuSlice.actions;

export default menuSlice.reducer;
