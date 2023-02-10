import {
  Box,
  Collapse,
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ALGORITHM_TYPES,
  APP_STATE,
  DELAY,
  DRAWER_WIDTH,
  HEURISTIC,
  MAZE_ALGORITHMS,
  PATH_ALGORITHMS,
  SLIDER_WIDTH,
} from "../constants";
import { updateAppState } from "../features/appSlice";
import { resetGrid } from "../features/gridSlice";
import { setMazeAlgorithm } from "../features/mazeSlice";
import { switchAlgo, updateAnimationSkip, updateAnimationDelay } from "../features/menuSlice";
import { setDiagonalTraversal, setHeuristic, setPathAlgorithm } from "../features/pathfindingSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { appState, animating } = useSelector((store) => store.app);
  const { selectedAlgo, algoType } = useSelector((store) => store.menu);
  const { algorithm, heuristic, diagonal } = useSelector((store) => store.pathfinding);
  // Check for states when changes in the algorithms and heuristics are not allowed
  const disableChanges = animating || appState === APP_STATE.PAUSED;

  const handleAlgoClick = (algo) => {
    switch (algo) {
      case PATH_ALGORITHMS.DEPTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.BREADTH_FIRST_SEARCH:
      case PATH_ALGORITHMS.GREEDY_BEST_FIRST_SEARCH:
      case PATH_ALGORITHMS.A_STAR_ALGORITHM:
      case PATH_ALGORITHMS.DIJKSTRA_ALGORITHM:
        dispatch(switchAlgo({ algo, type: ALGORITHM_TYPES.PATHFINDING }));
        dispatch(setPathAlgorithm(algo));
        break;
      case MAZE_ALGORITHMS.BASIC_RANDOM:
      case MAZE_ALGORITHMS.RECURSIVE_BACKTRACKING:
      case MAZE_ALGORITHMS.RECURSIVE_DIVISION:
      case MAZE_ALGORITHMS.KRUSKAL_ALGORITHM:
      case MAZE_ALGORITHMS.PRIM_ALGORITHM:
        dispatch(switchAlgo({ algo, type: ALGORITHM_TYPES.GENERATION }));
        dispatch(setMazeAlgorithm(algo));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Check if the app is done with the initial visualization
    if (appState === APP_STATE.VISUALIZED) {
      // Update the app state
      dispatch(updateAppState(APP_STATE.UPDATING));
      // Reset the grid to be instantly updated due to changing configurations after the initial visualization
      dispatch(resetGrid(false));
    }
  }, [algorithm, heuristic, diagonal]);

  const heuristics = (
    <FormControl sx={{ pl: 1 }}>
      <FormLabel sx={{ py: 1, fontSize: "0.875rem" }}>Heuristics</FormLabel>
      <RadioGroup
        value={heuristic}
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
      <Toolbar />
      <FormGroup sx={{ pt: 2, pl: 2 }}>
        <FormControlLabel
          control={
            <Switch
              disabled={disableChanges}
              onChange={(e) => dispatch(setDiagonalTraversal(e.target.checked))}
            />
          }
          label="Diagonal Movement"
        />
      </FormGroup>
      <FormGroup sx={{ py: 1, pl: 2 }}>
        <FormControlLabel
          control={
            <Switch
              disabled={disableChanges}
              onChange={(e) => dispatch(updateAnimationSkip(e.target.checked))}
            />
          }
          label="Skip Animation"
        />
      </FormGroup>
      <Divider />
      <List
        component="nav"
        subheader={<ListSubheader component="div">Animation Delay (ms)</ListSubheader>}
      >
        <Slider
          size="small"
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
        subheader={
          <ListSubheader
            component="button"
            sx={{
              ":enabled": { cursor: "pointer" },
              py: 0,
              width: "100%",
              border: "none",
              textAlign: "start",
            }}
            disabled={disableChanges}
            onClick={() =>
              algoType !== ALGORITHM_TYPES.PATHFINDING &&
              handleAlgoClick(PATH_ALGORITHMS.DEPTH_FIRST_SEARCH)
            }
          >
            Search Algorithms
          </ListSubheader>
        }
      >
        <Collapse in={algoType === ALGORITHM_TYPES.PATHFINDING} timeout="auto" unmountOnExit>
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
        </Collapse>
      </List>
      <Divider />
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="button"
            sx={{
              ":enabled": { cursor: "pointer" },
              py: 0,
              width: "100%",
              border: "none",
              textAlign: "start",
            }}
            disabled={disableChanges}
            onClick={() =>
              algoType !== ALGORITHM_TYPES.GENERATION &&
              handleAlgoClick(MAZE_ALGORITHMS.BASIC_RANDOM)
            }
          >
            Maze Generation Algorithms
          </ListSubheader>
        }
      >
        <Collapse in={algoType === ALGORITHM_TYPES.GENERATION} timeout="auto" unmountOnExit>
          <ListItemButton
            selected={selectedAlgo === MAZE_ALGORITHMS.BASIC_RANDOM}
            disabled={disableChanges}
            onClick={() => handleAlgoClick(MAZE_ALGORITHMS.BASIC_RANDOM)}
          >
            <ListItemText primary="Basic Random" />
          </ListItemButton>
          <ListItemButton
            selected={selectedAlgo === MAZE_ALGORITHMS.RECURSIVE_BACKTRACKING}
            disabled={disableChanges}
            onClick={() => handleAlgoClick(MAZE_ALGORITHMS.RECURSIVE_BACKTRACKING)}
          >
            <ListItemText primary="Recursive Backtracking" />
          </ListItemButton>
          <ListItemButton
            selected={selectedAlgo === MAZE_ALGORITHMS.RECURSIVE_DIVISION}
            disabled={disableChanges}
            onClick={() => handleAlgoClick(MAZE_ALGORITHMS.RECURSIVE_DIVISION)}
          >
            <ListItemText primary="Recursive Division" />
          </ListItemButton>
          <ListItemButton
            selected={selectedAlgo === MAZE_ALGORITHMS.KRUSKAL_ALGORITHM}
            disabled={disableChanges}
            onClick={() => handleAlgoClick(MAZE_ALGORITHMS.KRUSKAL_ALGORITHM)}
          >
            <ListItemText primary="Kruskal's Algorithm" />
          </ListItemButton>
          <ListItemButton
            selected={selectedAlgo === MAZE_ALGORITHMS.PRIM_ALGORITHM}
            disabled={disableChanges}
            onClick={() => handleAlgoClick(MAZE_ALGORITHMS.PRIM_ALGORITHM)}
          >
            <ListItemText primary="Prim's Algorithm" />
          </ListItemButton>
        </Collapse>
      </List>
      <Divider />
    </Box>
  );
};

export default Menu;
