import {
  Box,
  Collapse,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  APP_STATE,
  DELAY,
  DRAWER_WIDTH,
  HEURISTIC,
  MAZE_ALGORITHMS,
  PATH_ALGORITHMS,
  SLIDER_WIDTH,
} from "../constants";
import { switchAlgo, updateAnimationDelay } from "../features/menuSlice";
import { setDiagonalTraversal, setHeuristic, setPathAlgorithm } from "../features/pathfindingSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { appState } = useSelector((store) => store.app);
  const { selectedAlgo } = useSelector((store) => store.menu);
  // Check for states when changes in the algorithms and heuristics are not allowed
  const disableChanges = appState === APP_STATE.VISUALIZING || appState === APP_STATE.PAUSED;

  const handleAlgoClick = (algo) => {
    dispatch(switchAlgo(algo));
    switch (algo) {
      case PATH_ALGORITHMS.DEPTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.BREADTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH:
      case PATH_ALGORITHMS.A_STAR_ALGORITHM:
      case PATH_ALGORITHMS.DIJKSTRA_ALGORITHM:
        // TO-DELETE:
        console.log("Selected Path Algorithm is changed to", algo);
        dispatch(setPathAlgorithm(algo));
        break;
      default:
        // TO-DELETE:
        console.log("Selected Maze Algorithm is changed to", algo);
        break;
    }
  };

  const heuristics = (
    <FormControl sx={{ pl: 1 }}>
      <FormLabel sx={{ py: 1, fontSize: "0.875rem" }}>Heuristics</FormLabel>
      <RadioGroup
        defaultValue={HEURISTIC.MANHATTAN}
        name="heuristics-buttons-group"
        onChange={(e) => dispatch(setHeuristic(e.target.value))}
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
        <FormControlLabel value={HEURISTIC.OCTILE} control={<Radio />} label={HEURISTIC.OCTILE} />
      </RadioGroup>
    </FormControl>
  );

  return (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <CssBaseline />
      <Toolbar />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Animation Delay (ms)</ListSubheader>}
      >
        <Slider
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: SLIDER_WIDTH, ml: 2 }}
          defaultValue={DELAY.DEFAULT}
          step={DELAY.STEP}
          min={DELAY.MIN}
          max={DELAY.MAX}
          valueLabelDisplay="auto"
          onChangeCommitted={(_, value) => dispatch(updateAnimationDelay(value))}
        />
      </List>
      <Divider />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Path Traversal</ListSubheader>}
      >
        <FormGroup sx={{ pl: 2 }}>
          <FormControlLabel
            control={
              <Switch
                disabled={disableChanges}
                onChange={(e) => dispatch(setDiagonalTraversal(e.target.checked))}
              />
            }
            label="Allow Diagonals"
          />
        </FormGroup>
      </List>
      <Divider />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Search Algorithms</ListSubheader>}
      >
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.DEPTH_FIRST_SEARCH}
          disabled={disableChanges}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.DEPTH_FIRST_SEARCH)}
        >
          <ListItemText primary="Depth-First Search" />
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.BREADTH_FIRST_SEARCH}
          disabled={disableChanges}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.BREADTH_FIRST_SEARCH)}
        >
          <ListItemText primary="Breadth-First Search" />
        </ListItemButton>
        <ListItemButton
          sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          selected={selectedAlgo === PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH}
          disabled={disableChanges}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH)}
        >
          <ListItemText primary="Greedy Best-First Search" />
          <Collapse
            in={selectedAlgo === PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH}
            timeout="auto"
            unmountOnExit
          >
            {heuristics}
          </Collapse>
        </ListItemButton>
        <ListItemButton
          sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          selected={selectedAlgo === PATH_ALGORITHMS.A_STAR_ALGORITHM}
          disabled={disableChanges}
          onClick={() => handleAlgoClick(PATH_ALGORITHMS.A_STAR_ALGORITHM)}
        >
          <ListItemText primary="A* Algorithm" />
          <Collapse
            in={selectedAlgo === PATH_ALGORITHMS.A_STAR_ALGORITHM}
            timeout="auto"
            unmountOnExit
          >
            {heuristics}
          </Collapse>
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === PATH_ALGORITHMS.DIJKSTRA_ALGORITHM}
          disabled={disableChanges}
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
          disabled={disableChanges}
          onClick={() => handleAlgoClick(MAZE_ALGORITHMS.BASIC_RANDOM)}
        >
          <ListItemText primary="Basic Random" />
        </ListItemButton>
        <ListItemButton
          selected={selectedAlgo === MAZE_ALGORITHMS.RECURSIVE_DIVISION}
          disabled={disableChanges}
          onClick={() => handleAlgoClick(MAZE_ALGORITHMS.RECURSIVE_DIVISION)}
        >
          <ListItemText primary="Recursive Division" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Menu;
