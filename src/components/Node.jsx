import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOUSE_BUTTON, NODE_STATE } from "../constants";
import { handleMouseMove, handleMouseClick, handleMouseLift } from "../features/gridSlice";

const Node = ({ x, y, state }) => {
  const dispatch = useDispatch();
  let nextState = useSelector((store) => store.grid.grid[y][x]);

  const handleMouseDown = (event) => {
    if (event.buttons === MOUSE_BUTTON.LEFT) {
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.WALL;
      }
      dispatch(handleMouseClick({ x, y, nextState }));
    } else if (event.buttons === MOUSE_BUTTON.RIGHT) {
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.EMPTY;
      }
      dispatch(handleMouseClick({ x, y, nextState }));
    }
  };

  return (
    <div
      id={`node-${x}-${y}`}
      className="node-container"
      onMouseDown={handleMouseDown}
      onMouseEnter={() => dispatch(handleMouseMove({ x, y }))}
      onMouseUp={() => dispatch(handleMouseLift())}
    >
      <div className={`node ${state}`} />
    </div>
  );
};

Node.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default Node;
