import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PATH_ALGORITHMS } from "../constants";

// Return the information corresponding to each algorithm
const getAlgorithmInfo = {
  [PATH_ALGORITHMS.DEPTH_FIRST_SEARCH]: {
    title: "Depth-First Search",
    description: `Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures.
    The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and
    explores as far as possible along each branch before backtracking.`,
  },
  [PATH_ALGORITHMS.BREADTH_FIRST_SEARCH]: {
    title: "Breadth-First Search",
    description: `Breadth-first search (BFS) is an algorithm for searching a tree data structure for a node that
    satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving
    on to the nodes at the next depth level. Extra memory, usually a queue, is needed to keep track of the child nodes
    that were encountered but not yet explored. Implicit trees (such as game trees or other problem-solving trees) may
    be of infinite size, however, breadth-first search is guaranteed to find a solution node if one exists.`,
  },
  [PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH]: {
    title: "Greedy Best-First Search",
    description: `Best-first search is a class of search algorithms, which explore a graph by expanding the most
    promising node chosen according to a specified rule. Some authors have used "best-first search" to refer
    specifically to a search with a heuristic that attempts to predict how close the end of a path is to a solution
    (or, goal), so that paths which are judged to be closer to a solution (or, goal) are extended first. This specific
    type of search is called greedy best-first search or pure heuristic search.`,
  },
  [PATH_ALGORITHMS.A_STAR_ALGORITHM]: {
    title: "A* Search Algorithm",
    description: `A* is a graph traversal and path search algorithm, which is often used in many fields of computer
    science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its O(b^d)
    space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is
    generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as
    memory-bounded approaches. However, A* is still the best solution in many cases.`,
  },
  [PATH_ALGORITHMS.DIJKSTRA_ALGORITHM]: {
    title: "Dijkstra's Algorithm",
    description: `Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which
    may represent, for example, road networks. Dijkstra's original algorithm found the shortest path between two given
    nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source
    to all other nodes in the graph, producing a shortest-path tree. It can also be used for finding the shortest paths
    from a single node to a single destination node by stopping the algorithm once the shortest path to the destination
    node has been determined.`,
  },
};

const Info = () => {
  const time = useSelector((store) => store.pathfinding.time);
  const counter = useSelector((store) => store.grid.counter);
  const algoInfo = getAlgorithmInfo[useSelector((store) => store.menu.selectedAlgo)];

  return (
    <div>
      <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h6">Execution Time (ms)</Typography>
          <Typography variant="h3">{time.toFixed(5)}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h6">Nodes Visited</Typography>
          <Typography variant="h3">{counter.visited}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h6">Path Length</Typography>
          <Typography variant="h3">{counter.path}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ my: 2, ml: 0, mr: 3, backgroundColor: "background.paper" }}>
        <CardContent>
          <Typography variant="h6">{algoInfo.title}</Typography>
          <Typography variant="body2">{algoInfo.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Info;
