import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutorialOpen: true,
  pageNumber: 0,
};

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    closeTutorial: (state) => {
      state.tutorialOpen = false;
    },
    updatePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { closeTutorial, updatePageNumber } = tutorialSlice.actions;

export default tutorialSlice.reducer;
