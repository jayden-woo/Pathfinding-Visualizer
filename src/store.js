import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./features/Grid/gridSlice";
import pathfindingReducer from "./features/Pathfinding/pathfindingSlice";

const store = configureStore({
  reducer: {
    grid: gridReducer,
    pathfinding: pathfindingReducer,
  },
});

export default store;
