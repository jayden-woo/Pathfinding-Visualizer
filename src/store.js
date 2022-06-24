import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./features/Grid/gridSlice";

const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

export default store;
