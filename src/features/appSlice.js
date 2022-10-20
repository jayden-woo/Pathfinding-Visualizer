import { createSlice } from "@reduxjs/toolkit";
import { APP_STATE } from "../constants";

const initialState = {
  appState: APP_STATE.INTERACTIVE,
  animating: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateAppState: (state, action) => {
      state.appState = action.payload;
      state.animating =
        state.appState === APP_STATE.VISUALIZING || state.appState === APP_STATE.GENERATING;
      // TO-DELETE:
      console.log(`App state updated to "${state.appState}"!`);
    },
  },
});

export const { updateAppState } = appSlice.actions;

export default appSlice.reducer;
