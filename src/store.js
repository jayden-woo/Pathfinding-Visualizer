import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";
import gridReducer from "./features/gridSlice";
import mazeReducer from "./features/mazeSlice";
import menuReducer from "./features/menuSlice";
import pathfindingReducer from "./features/pathfindingSlice";
import tutorialReducer from "./features/tutorialSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    grid: gridReducer,
    maze: mazeReducer,
    menu: menuReducer,
    pathfinding: pathfindingReducer,
    tutorial: tutorialReducer,
  },
});

export default store;
