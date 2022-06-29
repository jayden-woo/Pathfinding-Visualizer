import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDimension } from "../features/Grid/gridSlice";
import { NODE_LARGE, NODE_SMALL, SCREEN_BREAKPOINT } from "../constants";
import useWindowSize from "../hooks/useWindowSize";
import Node from "./Node";

const Grid = () => {
  const ref = useRef(null);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const { grid, gridID } = useSelector((store) => store.grid);

  useEffect(() => {
    if (ref.current) {
      const nodeSize = windowSize.width > SCREEN_BREAKPOINT ? NODE_LARGE : NODE_SMALL;
      const rows = Math.trunc(ref.current.clientHeight / nodeSize);
      const cols = Math.trunc(ref.current.clientWidth / nodeSize);
      dispatch(updateDimension({ rows, cols }));
    }
  }, [windowSize]);

  return (
    <div ref={ref} className="grid" onContextMenu={(e) => e.preventDefault()}>
      {grid.map((row, y) => (
        <div key={gridID[y][0]} className="row">
          {row.map((state, x) => (
            <Node x={x} y={y} key={gridID[y][x]} state={state} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
