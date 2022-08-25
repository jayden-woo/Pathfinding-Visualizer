import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_STATE } from "../constants";
import { updateAppState } from "../features/appSlice";
import { resetGrid, updateNodeState } from "../features/gridSlice";
import { toggleDrawer } from "../features/menuSlice";
import { resetPathFinder, runPathFinder } from "../features/pathfindingSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { appState } = useSelector((store) => store.app);
  const { animationDelay } = useSelector((store) => store.menu);
  const { grid, start, target } = useSelector((store) => store.grid);
  const { visited, path } = useSelector((store) => store.pathfinding);
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
    // Call the pathfinder to start the pathfinding and then the visualization process
    dispatch(runPathFinder({ start, target, grid }));
    // Update the app state to indicate that the visualization has started
    dispatch(updateAppState(APP_STATE.VISUALIZING));
  };

  const handleClearClick = (all) => {
    // First reset the grid based on whether to clear all the states or just the path only
    dispatch(resetGrid(all));
    // Next reset the pathfinder and its state
    dispatch(resetPathFinder());
  };

  useEffect(() => {
    // Resume the animation when the app state is updated to visualizing
    if (appState === APP_STATE.VISUALIZING) visualize();
  }, [appState]);

  useEffect(() => {
    switch (appState) {
      // Check for situations when the visited array is updated while in the visualizing mode
      case APP_STATE.VISUALIZING:
        // Update the visual queue state with the elements from the visited array first then the path array
        setVisualQueue([...visited, ...path]);
        break;
      // Check for situations when the visited array is updated while the visualization is paused
      case APP_STATE.PAUSED:
        // User clicked on the clear buttons
        if (!visited.length) dispatch(updateAppState(APP_STATE.INTERACTIVE));
        break;
      // Check for situations when the visited array is updated while the app is done with the visualization
      case APP_STATE.VISUALIZED:
        // User clicked on the clear buttons
        if (!visited.length) dispatch(updateAppState(APP_STATE.INTERACTIVE));
        // TODO: Add functionality for instantly updating the path when algorithm is changed by instantly
        // replacing the grid with the final grid state after algorithm is done running
        break;
      default:
        break;
    }
  }, [visited]);

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
          disabled={appState === APP_STATE.VISUALIZING}
          onClick={() => handleClearClick(true)}
        >
          Clear All
        </Button>
        <Button
          sx={{ color: "text.primary" }}
          variant="text"
          disableElevation
          disabled={appState === APP_STATE.VISUALIZING}
          onClick={() => handleClearClick(false)}
        >
          Clear Path
        </Button>
        {appState === APP_STATE.PAUSED ? (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            disableElevation
            onClick={() => dispatch(updateAppState(APP_STATE.VISUALIZING))}
          >
            Resume
          </Button>
        ) : (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            disableElevation
            disabled={appState !== APP_STATE.VISUALIZING}
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
