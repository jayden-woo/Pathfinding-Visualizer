import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NODE_STATE } from "../constants";
import { handlePauseClick, resetGrid, updateNodeState } from "../features/gridSlice";
import { toggleDrawer } from "../features/menuSlice";
import { resetPathFinder, runPathFinder } from "../features/pathfindingSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { animationDelay } = useSelector((store) => store.menu);
  const { grid, start, target, paused } = useSelector((store) => store.grid);
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
        if (!paused) {
          // Pop the first node from the queue and update it to its next state
          setVisualQueue(([node, ...rest]) => {
            // Check if there's any node in the queue first to prevent error from destructuring undefined object
            if (node) dispatch(updateNodeState(node));
            return rest;
          });
        }
        // Clear any pending timeout if the queue is already empty
        if (!visualQueue.length) clearTimeout(visualID);
      }, animationDelay);
  };

  const handleClearClick = (pathOnly) => {
    dispatch(resetGrid(pathOnly));
    dispatch(resetPathFinder());
  };

  // Resume the animation when the paused state is updated
  useEffect(() => {
    if (!paused) visualize();
  }, [paused]);

  // Populate the visualization queue when the visited array is modified
  useEffect(() => {
    // Start with an empty array
    const queue = [];
    // Add each node in the visited array to the queue array
    visited.forEach((node) => {
      // Attach a label to each node indicating that it's from the searching process
      queue.push({ ...node, next: NODE_STATE.EXPLORED });
    });
    // Add each node in the path array to the queue array next
    path.forEach((node) => {
      // Attach a label to each node indicating that it's part of the path found
      queue.push({ ...node, next: NODE_STATE.PATH });
    });
    // Update the visual queue state with the queue array
    setVisualQueue(queue);
  }, [visited]);

  // Call the visualize function again everytime a node is popped from the visual queue
  useEffect(() => {
    if (visualQueue.length) visualize();
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
          Pathfinding Visualizer
        </Typography>
        <Button
          variant="text"
          disableElevation
          onClick={() => dispatch(runPathFinder({ start, target, grid }))}
        >
          Visualize
        </Button>
        <Button variant="text" disableElevation onClick={() => handleClearClick(false)}>
          Clear All
        </Button>
        <Button variant="text" disableElevation onClick={() => handleClearClick(true)}>
          Clear Path
        </Button>
        {!paused && (
          <Button variant="text" disableElevation onClick={() => dispatch(handlePauseClick(true))}>
            Pause
          </Button>
        )}
        {paused && (
          <Button variant="text" disableElevation onClick={() => dispatch(handlePauseClick(false))}>
            Resume
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
