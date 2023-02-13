import { createSlice } from "@reduxjs/toolkit";
import { APP_STATE } from "../constants";

const initialState = {
  appState: APP_STATE.INTERACTIVE,
  isAnimating: false,
  isModifiable: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateAppState: (state, action) => {
      state.appState = action.payload;
      switch (state.appState) {
        case APP_STATE.INTERACTIVE:
        case APP_STATE.VISUALIZED:
          state.isAnimating = false;
          state.isModifiable = true;
          break;
        case APP_STATE.VISUALIZING:
        case APP_STATE.GENERATING:
          state.isAnimating = true;
          state.isModifiable = false;
          break;
        case APP_STATE.PAUSED:
        case APP_STATE.UPDATING:
          state.isAnimating = false;
          state.isModifiable = false;
          break;
        default:
          break;
      }
      // TO-DELETE:
      console.log(`App state updated to "${state.appState}"!`);
    },
  },
});

export const { updateAppState } = appSlice.actions;

export default appSlice.reducer;
