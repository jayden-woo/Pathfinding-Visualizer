import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";
import gridReducer from "./features/gridSlice";
import menuReducer from "./features/menuSlice";
import pathfindingReducer from "./features/pathfindingSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    grid: gridReducer,
    pathfinding: pathfindingReducer,
  },
});

export default store;
