import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line arrow-body-style
const Node = ({ x, y, nodeID, state }) => {
  // console.log(key, typeof key);

  return <div id={`node-${x}-${y}`} key={nodeID} className={`node ${state}`} />;
};

Node.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  nodeID: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default Node;
