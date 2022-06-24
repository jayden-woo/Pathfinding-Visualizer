import React from "react";
import Grid from "../Grid/Grid";

const App = () => (
  <div className="App">
    <h1>Pathfinding Visualizer</h1>
    <p>Algorithms</p>
    <ul>
      <li>Breadth First Search</li>
      <li>Depth First Search</li>
      <li>Dijkstra&apos;s Algorithm</li>
      <li>A* Algorithm</li>
    </ul>
    <p>To-Do</p>
    <ul>
      <li>Add stats tracking. (i.e. time taken, path length, number of nodes explored)</li>
    </ul>
    <h1>Grid</h1>
    <Grid />
  </div>
);

export default App;
