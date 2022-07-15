import { createSlice } from "@reduxjs/toolkit";
import { PATH_ALGORITHMS } from "../constants";

const initialState = {
  selectedAlgo: PATH_ALGORITHMS.DEPTH_FIRST_SEARCH,
  mobileDrawerOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    switchAlgo: (state, action) => {
      // TO-DELETE:
      console.log("Menu Selected Algo State changed to", action.payload);
      state.selectedAlgo = action.payload;
    },
    toggleDrawer: (state, action) => {
      console.log("Before", state.mobileDrawerOpen);
      state.mobileDrawerOpen = action.payload || !state.mobileDrawerOpen;
      console.log("After", state.mobileDrawerOpen);
    },
  },
});

export const { switchAlgo, toggleDrawer } = menuSlice.actions;

export default menuSlice.reducer;
