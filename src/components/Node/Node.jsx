import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { MOUSE_BUTTON, NODE_STATE } from "../../constants";
import { handleMouseMove, setMouseClick, setMouseLift } from "../../features/Grid/gridSlice";

const Node = ({ x, y, state }) => {
  const dispatch = useDispatch();
  const node = useSelector((store) => store.grid.grid[y].row[x]);

  const handleMouseDown = (event) => {
    let nextState = node.state;
    if (event.buttons === MOUSE_BUTTON.LEFT) {
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.WALL;
      }
      dispatch(setMouseClick({ x, y, nextState }));
    } else if (event.buttons === MOUSE_BUTTON.RIGHT) {
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.EMPTY;
      }
      dispatch(setMouseClick({ x, y, nextState }));
    }
  };

  return (
    <div
      id={`node-${x}-${y}`}
      className={`node ${state}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => dispatch(handleMouseMove({ x, y }))}
      onMouseUp={() => dispatch(setMouseLift())}
    />
  );
};

Node.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default Node;
