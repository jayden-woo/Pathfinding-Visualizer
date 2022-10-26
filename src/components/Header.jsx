import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALGORITHM_TYPES, APP_STATE, NODE_STATE } from "../constants";
import { updateAppState } from "../features/appSlice";
import { fillGrid, replaceGrid, resetGrid, updateNodeState } from "../features/gridSlice";
import { resetMazeGenerator, runMazeGenerator } from "../features/mazeSlice";
import { toggleDrawer } from "../features/menuSlice";
import { resetPathFinder, runPathFinder } from "../features/pathfindingSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { appState, animating } = useSelector((store) => store.app);
  const { animationDelay, algoType } = useSelector((store) => store.menu);
  const { grid, start, target } = useSelector((store) => store.grid);
  const { visited, path, final } = useSelector((store) => store.pathfinding);
  const { animation, order, maze } = useSelector((store) => store.maze);
  const [visualQueue, setVisualQueue] = useState([]);
  let visualID;

  // Visualize the pathfinding process from searching for a path to tracing back the path found
  const visualize = () => {
    visualID =
      // Check if there's already an animation pending
      !visualID &&
      // Set a timeout for the animation process according to the delay selected
      setTimeout(() => {
        // Skip the animation if it is currently paused
        if (appState !== APP_STATE.PAUSED) {
          // Pop the first node from the queue and update it to its next state
          setVisualQueue(([node, ...rest]) => {
            // Check if there's any node in the queue first to prevent error from destructuring undefined object
            if (node) dispatch(updateNodeState(node));
            // Return the rest of the queue to be updated and assigned to the variable
            return rest;
          });
        }
        // Clear any pending timeout if the queue is already empty
        if (!visualQueue.length) clearTimeout(visualID);
      }, animationDelay);
  };

  const handleVisualizeClick = () => {
    if (algoType === ALGORITHM_TYPES.PATHFINDING) {
      // Call the pathfinder to start the pathfinding and then the visualization process
      dispatch(runPathFinder({ start, target, grid }));
      // Update the app state to indicate that the visualization has started
      dispatch(updateAppState(APP_STATE.VISUALIZING));
    } else {
      // Reset the grid to remove all the walls first
      dispatch(resetGrid(true));
      // Call the maze generator to start the generation and then the visualization process
      dispatch(runMazeGenerator({ start, target, grid }));
      // Update the app state to indicate that the maze generation has started
      dispatch(updateAppState(APP_STATE.GENERATING));
    }
  };

  const handleClearClick = (all) => {
    // First reset the grid based on whether to clear all the states or just the path only
    dispatch(resetGrid(all));
    // Next reset the pathfinder and its state
    dispatch(resetPathFinder());
    // Next reset the maze generator and its state
    dispatch(resetMazeGenerator());
  };

  useEffect(() => {
    // Resume the animation when the app state is updated to visualizing or generating
    if (appState === APP_STATE.VISUALIZING || appState === APP_STATE.GENERATING) visualize();
  }, [appState]);

  useEffect(() => {
    // Run the pathfinder again when the grid is done resetting for new configurations
    if (appState === APP_STATE.UPDATING) dispatch(runPathFinder({ start, target, grid }));
  }, [grid]);

  useEffect(() => {
    switch (appState) {
      // Check for updates while in the visualizing mode
      case APP_STATE.VISUALIZING:
        // Update the visual queue state with the elements from the visited array first then the path array
        setVisualQueue([...visited, ...path]);
        break;
      // Check for updates while the visualization is paused
      case APP_STATE.PAUSED:
      // Fall through for updates while the app is done with the visualization
      case APP_STATE.VISUALIZED:
        // User clicked on the clear buttons
        if (!visited.length) dispatch(updateAppState(APP_STATE.INTERACTIVE));
        break;
      // Check for updates while the app is instantly updating with new paths after the initial visualization
      case APP_STATE.UPDATING:
        // User changed the configurations (algorithm or diagonals) after finished with the initial visualization
        dispatch(replaceGrid(final));
        dispatch(updateAppState(APP_STATE.VISUALIZED));
        break;
      default:
        break;
    }
  }, [visited]);

  useEffect(() => {
    // Skip the maze generation if the app is not in the generating mode
    if (appState !== APP_STATE.GENERATING) return;
    // Check if maze generation process needs to be animated
    if (animation) {
      // Fill the grid with wall nodes first if the maze generation algorithm is of the passage carver type
      if (order[0].tag === NODE_STATE.EMPTY) dispatch(fillGrid(NODE_STATE.WALL));
      // Update the visual queue state with the elements from the order array
      setVisualQueue(order);
    } else {
      // Replace the grid with the generated maze and update the app state to interactive mode
      dispatch(replaceGrid({ grid: maze }));
      dispatch(updateAppState(APP_STATE.INTERACTIVE));
    }
  }, [order]);

  useEffect(() => {
    // Check if any animation is still pending
    if (visualQueue.length) {
      // Call the visualize function again every time a node is popped from the visual queue
      visualize();
    }
    // Check if the app is in the visualizing state with an empty visual queue
    else if (appState === APP_STATE.VISUALIZING) {
      // Update the app state to visualized when no more visualization is left
      dispatch(updateAppState(APP_STATE.VISUALIZED));
    }
    // Check if the app is in the generating state with an empty visual queue
    else if (appState === APP_STATE.GENERATING) {
      // Update the app state to interactive when no more generation is left
      dispatch(updateAppState(APP_STATE.INTERACTIVE));
    }
    // Clear any pending timeout when the component is being unmounted
    return () => clearTimeout(visualID);
  }, [visualQueue]);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "background.paper" }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ pl: 1, pr: 4, display: { xs: "none", sm: "block" } }}
        >
          <Link href="/" underline="none" color="inherit">
            Pathfinding Visualizer
          </Link>
        </Typography>
        <Button
          sx={{ color: "text.primary" }}
          variant="text"
          disableElevation
          disabled={appState !== APP_STATE.INTERACTIVE}
          onClick={() => handleVisualizeClick()}
        >
          Visualize
        </Button>
        <Button
          sx={{ color: "text.primary" }}
          variant="text"
          disableElevation
          disabled={animating}
          onClick={() => handleClearClick(true)}
        >
          Clear All
        </Button>
        <Button
          sx={{ color: "text.primary" }}
          variant="text"
          disableElevation
          disabled={animating}
          onClick={() => handleClearClick(false)}
        >
          Clear Path
        </Button>
        {appState === APP_STATE.PAUSED ? (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            disableElevation
            onClick={() =>
              dispatch(
                updateAppState(
                  algoType === ALGORITHM_TYPES.PATHFINDING
                    ? APP_STATE.VISUALIZING
                    : APP_STATE.GENERATING
                )
              )
            }
          >
            Resume
          </Button>
        ) : (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            disableElevation
            disabled={!animating}
            onClick={() => dispatch(updateAppState(APP_STATE.PAUSED))}
          >
            Pause
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
