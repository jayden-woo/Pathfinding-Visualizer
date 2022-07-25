import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELAY } from "../constants";
import { resetGrid, updateNodeState, updatePathVisualized } from "../features/Grid/gridSlice";
import { toggleDrawer } from "../features/menuSlice";
import { resetPathFinder, runPathFinder } from "../features/Pathfinding/pathfindingSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { grid, start, target, pathVisualized } = useSelector((store) => store.grid);
  const { visited, path } = useSelector((store) => store.pathfinding);
  const [visualQueue, setVisualQueue] = useState([]);
  let visualID;

  const visualize = () => {
    visualID =
      !visualID &&
      setTimeout(() => {
        setVisualQueue(([{ x, y }, ...rest]) => {
          dispatch(updateNodeState({ x, y }));
          return rest;
        });
        if (!visualQueue.length) clearTimeout(visualID);
      }, DELAY.FAST);
  };

  const handleVisualizeClick = () => {
    dispatch(runPathFinder({ start, target, grid }));
  };

  const handlePauseClick = () => {
    clearTimeout(visualID);
    visualID = null;
  };

  const handleClearClick = (pathOnly) => {
    dispatch(resetGrid(pathOnly));
    dispatch(resetPathFinder());
  };

  useEffect(() => {
    setVisualQueue(visited);
  }, [visited]);

  useEffect(() => {
    if (visualQueue.length) {
      visualize();
    } else if (path.length && !pathVisualized) {
      setVisualQueue(path);
      dispatch(updatePathVisualized(true));
    }
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
        <Button variant="text" disableElevation onClick={handleVisualizeClick}>
          Visualize
        </Button>
        <Button variant="text" disableElevation onClick={() => handleClearClick(false)}>
          Clear All
        </Button>
        <Button variant="text" disableElevation onClick={() => handleClearClick(true)}>
          Clear Path
        </Button>
        <Button variant="text" disableElevation onClick={handlePauseClick}>
          Pause
        </Button>
        <Button variant="text" disableElevation onClick={visualize}>
          Continue
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
