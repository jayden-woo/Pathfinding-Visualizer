import {
  Collapse,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HEURISTIC, MAZE_ALGORITHMS, PATH_ALGORITHMS } from "../constants";
import { switchAlgo } from "../features/menuSlice";
import { setPathAlgorithm } from "../features/Pathfinding/pathfindingSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { selectedAlgo } = useSelector((store) => store.menu);

  const handleAlgoClick = (algo) => {
    dispatch(switchAlgo(algo));
    switch (algo) {
      case PATH_ALGORITHMS.DEPTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.BREADTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.A_STAR_ALGORITHM:
      case PATH_ALGORITHMS.DIJKSTRA_ALGORITHM:
        // TO-DELETE:
        console.log("Selected Path Algorithm is changed to", algo);
        dispatch(setPathAlgorithm(algo));
        break;
      default:
        // TO-DELETE:
        console.log("Selected Path Algorithm is changed to", algo);
        break;
    }
  };

  return (
    <div>
      <CssBaseline />
      <Toolbar />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Search Algorithms</ListSubheader>}
      >
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.DEPTH_FIRST_SEARCH}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.DEPTH_FIRST_SEARCH)}
        >
          <ListItemText primary="Depth-First Search" />
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.BREADTH_FIRST_SEARCH}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.BREADTH_FIRST_SEARCH)}
        >
          <ListItemText primary="Breadth-First Search" />
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.A_STAR_ALGORITHM}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.A_STAR_ALGORITHM)}
        >
          <ListItemText primary="A* Algorithm" />
        </ListItemButton>
        <Collapse
          in={selectedAlgo === PATH_ALGORITHMS.A_STAR_ALGORITHM}
          timeout="auto"
          unmountOnExit
        >
          <FormControl>
            <FormLabel>Heuristic</FormLabel>
            <RadioGroup
              defaultValue={HEURISTIC.MANHATTAN}
              name="heuristics-buttons-group"
              // TO-DELETE:
              onChange={(e) => console.log(e.target.value)}
            >
              <FormControlLabel
                value={HEURISTIC.MANHATTAN}
                control={<Radio />}
                label={HEURISTIC.MANHATTAN}
              />
              <FormControlLabel
                value={HEURISTIC.EUCLIDEAN}
                control={<Radio />}
                label={HEURISTIC.EUCLIDEAN}
              />
              <FormControlLabel
                value={HEURISTIC.CHEBYSHEV}
                control={<Radio />}
                label={HEURISTIC.CHEBYSHEV}
              />
              <FormControlLabel
                value={HEURISTIC.OCTILE}
                control={<Radio />}
                label={HEURISTIC.OCTILE}
              />
            </RadioGroup>
          </FormControl>
        </Collapse>
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.DIJKSTRA_ALGORITHM}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.DIJKSTRA_ALGORITHM)}
        >
          <ListItemText primary="Dijkstra's Algorithm" />
        </ListItemButton>
      </List>
      <Divider />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Maze Generation Algorithms</ListSubheader>}
      >
        <ListItemButton
          selected={selectedAlgo === MAZE_ALGORITHMS.BASIC_RANDOM}
          onClick={() => handleAlgoClick(MAZE_ALGORITHMS.BASIC_RANDOM)}
        >
          <ListItemText primary="Basic Random" />
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === MAZE_ALGORITHMS.RECURSIVE_DIVISION}
          onClick={() => handleAlgoClick(MAZE_ALGORITHMS.RECURSIVE_DIVISION)}
        >
          <ListItemText primary="Recursive Division" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Menu;
