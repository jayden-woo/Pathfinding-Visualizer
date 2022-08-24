import { createSlice } from "@reduxjs/toolkit";
import { APP_STATE } from "../constants";

const initialState = {
  appState: APP_STATE.INTERACTIVE,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateAppState: (state, action) => {
      state.appState = action.payload;
      // TO-DELETE:
      console.log(`App state updated to "${state.appState}"!`);
    },
  },
});

export const { updateAppState } = appSlice.actions;

export default appSlice.reducer;
