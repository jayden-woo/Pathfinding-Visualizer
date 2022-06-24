/* eslint-disable array-callback-return */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDimension } from "../../features/Grid/gridSlice";
import { NODE_SIZE } from "../../constants";
import useWindowSize from "../../hooks/useWindowSize";
import Node from "../Node/Node";

const Grid = () => {
  const ref = useRef(null);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { dimension, grid } = useSelector((store) => store.grid);

  // console.log(grid, start, target);

  useEffect(() => {
    if (ref.current) {
      const rows = Math.trunc(ref.current.clientHeight / NODE_SIZE);
      const cols = Math.trunc(ref.current.clientWidth / NODE_SIZE);
      dispatch(updateDimension({ rows, cols }));
      console.log(dimension);
    }
  }, [windowSize]);

  return (
    <div ref={ref} className="grid">
      {grid.map(({ rowID, row }, y) => (
        <div key={rowID} className="row">
          {row.map(({ nodeID, state }, x) => (
            <Node x={x} y={y} nodeID={nodeID} state={state} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
