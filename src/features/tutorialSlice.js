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
      // TO-DELETE:
      console.log(state.tutorialOpen ? "Tutorial opened!" : "Tutorial closed!");
    },
    updatePageNumber: (state, action) => {
      state.pageNumber = action.payload;
      // TO-DELETE:
      console.log("Page number changed to", state.pageNumber);
    },
  },
});

export const { closeTutorial, updatePageNumber } = tutorialSlice.actions;

export default tutorialSlice.reducer;
