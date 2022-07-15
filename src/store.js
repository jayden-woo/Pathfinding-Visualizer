import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./features/Grid/gridSlice";
import menuReducer from "./features/menuSlice";
import pathfindingReducer from "./features/Pathfinding/pathfindingSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    grid: gridReducer,
    pathfinding: pathfindingReducer,
  },
});

export default store;
