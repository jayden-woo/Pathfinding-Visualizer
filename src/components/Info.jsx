import { Box, Card, CardContent, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { ALGORITHM_TYPES, MAZE_ALGORITHMS, NODE_STATE, PATH_ALGORITHMS } from "../constants";

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
    description: `Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph.
    Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a
    single node as the "source" node and finds shortest paths from the source to all other nodes in the graph,
    producing a shortest-path tree. It can also be used for finding the shortest paths from a single node to a single
    destination node by stopping the algorithm once the shortest path to the destination node has been determined.`,
  },
  [MAZE_ALGORITHMS.BASIC_RANDOM]: {
    title: "Basic Random Method",
    description: `Mazes can be created with the basic random method, which loops through all the available empty spaces
    in the maze's space and for each space, decide whether it would be converted into a wall based on a preset
    probability. This method results in mazes with irregular wall structures where walls could be clumped up very
    closely or spread into random areas. The resulting maze might not have a possible solution unless extra check are
    added before deciding on whether an area should be replaced with walls.`,
  },
  [MAZE_ALGORITHMS.RECURSIVE_BACKTRACKING]: {
    title: "Recursive Backtracking Method",
    description: `This method is one of the simplest ways to generate a maze. Starting from a random cell, select a
    random neighbouring unvisited cell and remove the wall between them and adding it to the stack to facilitate future
    backtracking. This process is repeated, until reaching a cell that has no unvisited neighbours. It then backtracks
    until it reaches a cell with an unvisited neighbour before continuing the process. This process continues until
    every cell has been visited, causing it to backtrack all the way back to the beginning.`,
  },
  [MAZE_ALGORITHMS.RECURSIVE_DIVISION]: {
    title: "Recursive Division Method",
    description: `Mazes can be created with the recursive division method, an algorithm which works as follows: Begin
    with the maze's space with no walls. Call this a chamber. Divide the chamber with a randomly positioned wall (or
    multiple walls) where each wall contains a randomly positioned passage opening within it. Then recursively repeat
    the process on the sub-chambers until all chambers are minimum sized. This method results in mazes with long
    straight walls crossing their space, making it easier to see which areas to avoid.`,
  },
  [MAZE_ALGORITHMS.KRUSKAL_ALGORITHM]: {
    title: "Randomized Kruskal's Algorithm",
    description: `This algorithm is a randomized version of Kruskal's algorithm. Kruskal's algorithm finds a minimum
    spanning forest of an undirected edge-weighted graph. If the graph is connected, it finds a minimum spanning tree.
    (A minimum spanning tree of a graph is a subset of the edges that forms a tree that includes every vertex, where
    the sum of the weights of all the edges in the tree is minimized.) It is a greedy algorithm in graph theory as in
    each step it adds the next lowest-weight edge that will not form a cycle to the minimum spanning forest.`,
  },
  [MAZE_ALGORITHMS.PRIM_ALGORITHM]: {
    title: "Randomized Prim's Algorithm",
    description: `This algorithm is a randomized version of Prim's algorithm. Prim's algorithm (also known as Jarník's
    algorithm) is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. The algorithm
    operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the
    cheapest possible connection from the tree to another vertex. For graphs that are sufficiently dense, Prim's
    algorithm can be made to run in linear time, meeting or improving the time bounds for other algorithms.`,
  },
};

const Info = () => {
  const time = useSelector((store) => store.pathfinding.time);
  const counter = useSelector((store) => store.grid.counter);
  const stats = useSelector((store) => store.menu.algoType) === ALGORITHM_TYPES.PATHFINDING;
  const algoInfo = getAlgorithmInfo[useSelector((store) => store.menu.selectedAlgo)];
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: { lg: "30%" } }}>
      <Grid container>
        <Grid item xs={12}>
          <Card
            sx={{
              mt: { lg: 2 },
              mb: 1,
              ml: { xs: 2, lg: 0 },
              mr: 2,
              backgroundColor: "background.paper",
            }}
          >
            <CardContent>
              <Typography variant="h6">Legend</Typography>
              <Grid sx={{ pt: 1 }} container item spacing={1}>
                {Object.values(NODE_STATE)
                  .filter((state) => state !== NODE_STATE.EMPTY)
                  .map((state) => (
                    <Grid
                      container
                      item
                      key={state}
                      spacing={0}
                      xs={4}
                      sm={2}
                      lg={4}
                      alignItems="center"
                    >
                      <div className={`node ${state}`} />
                      <Typography sx={{ pl: 1 }} variant="body2">
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container item columns={{ xs: 10, sm: 10, md: 10, lg: 12 }} xs={12}>
          {!mobile && (
            <Grid item sm={4} lg={12}>
              {/* TO-DO: Fix execution time tracking for complicated algorithms or remove it completely */}
              {/* TO-DO: Fix screen moving for execution time longer than two digits */}
              <Card
                sx={{
                  my: 1,
                  ml: { xs: 2, lg: 0 },
                  mr: { xs: 1, lg: 2 },
                  backgroundColor: "background.paper",
                }}
              >
                <CardContent>
                  <Typography variant="h6">Execution Time (ms)</Typography>
                  <Typography variant="h3">{time.toFixed(4)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={5} sm={3} lg={6}>
            <Card
              sx={{
                my: 1,
                ml: { xs: 2, sm: 1, lg: 0 },
                mr: { xs: 1, lg: 2 },
                backgroundColor: "background.paper",
              }}
            >
              <CardContent>
                <Typography variant="h6">{mobile ? "Visited" : "Nodes Visited"}</Typography>
                <Typography variant="h3">{stats ? counter.visited : 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} sm={3} lg={6}>
            <Card
              sx={{
                my: 1,
                ml: { xs: 1, lg: 0 },
                mr: 2,
                backgroundColor: "background.paper",
              }}
            >
              <CardContent>
                <Typography variant="h6">{mobile ? "Path" : "Path Length"}</Typography>
                <Typography variant="h3">{stats ? counter.path : 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ my: 1, ml: { xs: 2, lg: 0 }, mr: 2, backgroundColor: "background.paper" }}>
            <CardContent>
              <Typography variant="h6">{algoInfo.title}</Typography>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                {algoInfo.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Info;
