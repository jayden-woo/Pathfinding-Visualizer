import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_STATE, MOUSE_BUTTON, NODE_STATE } from "../constants";
import { handleMouseMove, handleMouseClick, handleMouseLift } from "../features/gridSlice";

const Node = ({ x, y, state }) => {
  const dispatch = useDispatch();
  const { appState } = useSelector((store) => store.app);
  let nextState = useSelector((store) => store.grid.grid[y][x]);

  const handleMouseDown = (event) => {
    // Disable clicking or dragging on nodes when the app is not in the interactive mode
    if (appState !== APP_STATE.INTERACTIVE) return;
    // Check for left clicks by the user
    if (event.buttons === MOUSE_BUTTON.LEFT) {
      // Check that user is not clicking on the start or the target node which indicates changing the node state to a wall
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.WALL;
      }
      dispatch(handleMouseClick({ x, y, nextState }));
    }
    // Check for right clicks by the user
    else if (event.buttons === MOUSE_BUTTON.RIGHT) {
      // Check that user is not clicking on the start or the target node which indicates changing the node state back to empty
      if (nextState !== NODE_STATE.START && nextState !== NODE_STATE.TARGET) {
        nextState = NODE_STATE.EMPTY;
      }
      dispatch(handleMouseClick({ x, y, nextState }));
    }
  };

  return (
    <div
      id={`node-${x}-${y}`}
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
