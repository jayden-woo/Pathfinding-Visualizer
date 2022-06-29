import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELAY, PATH_ALGORITHMS } from "../constants";
import { updateNodeState, updatePathVisualized } from "../features/Grid/gridSlice";
import { runPathFinder, setPathAlgorithm } from "../features/Pathfinding/pathfindingSlice";

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

  const handleStopClick = () => {
    clearTimeout(visualID);
    visualID = null;
  };

  useEffect(() => {
    setVisualQueue(visited);
  }, [visited]);

  useEffect(() => {
    if (visualQueue.length) {
      visualize();
    } else if (!pathVisualized) {
      setVisualQueue(path);
      dispatch(updatePathVisualized(true));
    }
    return () => clearTimeout(visualID);
  }, [visualQueue]);

  return (
    <div className="header">
      <div>
        <h1>Pathfinding Visualizer</h1>
        <button
          type="button"
          onClick={() => dispatch(setPathAlgorithm(PATH_ALGORITHMS.DEPTH_FIRST_SEARCH))}
        >
          Depth First Search
        </button>
        <button type="button" onClick={handleVisualizeClick}>
          Visualize
        </button>
        <button type="button" onClick={handleStopClick}>
          Stop
        </button>
        <button type="button" onClick={visualize}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Header;
