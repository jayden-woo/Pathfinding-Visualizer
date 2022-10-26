import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDimension } from "../features/gridSlice";
import { GRID_SIZE, NAV_HEIGHT, NODE_SIZE } from "../constants";
import useWindowSize from "../hooks/useWindowSize";
import Node from "./Node";

const Grid = () => {
  const ref = useRef(null);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const { grid, gridID } = useSelector((store) => store.grid);
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  // Clamp a number to be between a given range
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  // Update the amount of rows and cols to be displayed every time the screen size changed
  useEffect(() => {
    if (ref.current) {
      // Get the node size according to the size of the current screen
      const nodeSize = largeScreen ? NODE_SIZE.LARGE : NODE_SIZE.SMALL;
      // Clamp the number of rows to be between the preset minimum and maximum amount
      let rows = clamp(
        // Calculate and round down the amount of rows that could fit within the width of the free space
        Math.trunc((ref.current.clientHeight - NAV_HEIGHT) / nodeSize),
        GRID_SIZE.ROWS.MIN,
        GRID_SIZE.ROWS.MAX
      );
      // Clamp the number of columns to be between the preset minimum and maximum amount
      let cols = clamp(
        // Calculate and round down the amount of columns that could fit within the width of the free space
        Math.trunc(ref.current.clientWidth / nodeSize),
        GRID_SIZE.COLS.MIN,
        GRID_SIZE.COLS.MAX
      );
      // Floor the number of rows and columns to the nearest odd number for a better maze generation result
      rows -= (rows - 1) % 2;
      cols -= (cols - 1) % 2;
      // Update the calculated dimension
      dispatch(updateDimension({ rows, cols }));
    }
  }, [windowSize]);

  return (
    <Box
      ref={ref}
      sx={{
        minWidth: GRID_SIZE.MIN_WIDTH,
        flexGrow: 1,
        height: "100%",
        my: 2,
        mx: { xs: 1, sm: 2 },
      }}
      // Prevent the context menu from popping up when the user right clicks within the grid
      onContextMenu={(e) => e.preventDefault()}
    >
      {grid.map((row, y) => (
        <Box
          key={gridID[y][0]}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {row.map((state, x) => (
            <Node x={x} y={y} key={gridID[y][x]} state={state} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Grid;
