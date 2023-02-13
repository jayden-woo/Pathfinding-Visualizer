import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { grid, gridUpdate, menu, menuMaze, menuSearch, navbar } from "../assets";
import { TUTORIAL_WIDTH } from "../constants";
import { closeTutorial, updatePageNumber } from "../features/tutorialSlice";

const Bold = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "900",
}));

const content = [
  {
    title: "Welcome to Pathfinding Visualizer",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          This short tutorial will walk you through some of the features and capabilities of this
          web app.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Feel free to skip or close the tutorial at anytime by clicking on the <Bold>ESC</Bold> key
          or the <Bold>X</Bold> button at the top-right corner of this dialog.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          You can also navigate through to the next page of the tutorial by clicking on the{" "}
          <Bold>Left</Bold> key or the <Bold>Next</Bold> button at the bottom right corner of the
          dialog.
        </Typography>
        <Typography variant="body2">
          On the flip side, you can go back to the previous page by clicking on the{" "}
          <Bold>Right</Bold> key or the <Bold>Previous</Bold> button next to it.
        </Typography>
      </>
    ),
  },
  {
    title: "Creating the Maze",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          First off, you can create the maze by clicking or holding the <Bold>Left</Bold> mouse
          button over any empty nodes on the grid to place down walls.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          On the other hand, you can also click or hold down the <Bold>Right</Bold> mouse button to
          remove any wall nodes from the grid.
        </Typography>
        <Typography variant="body2">
          The start and target nodes can also be moved to any other spot on the grid by dragging
          them over with the <Bold>Left</Bold> or <Bold>Right</Bold> mouse buttons.
        </Typography>
      </>
    ),
    gif: grid,
  },
  {
    title: "Picking a Maze Generation Algorithm",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Alternatively, you can pick one of the provided maze generation algorithms to
          automatically create a maze based on the underlying logic and methodology used by each
          algorithm.
        </Typography>
        <Typography variant="body2">
          Note that you can click on the <Bold>Maze Generation Algorithms</Bold> heading to expand
          the algorithm options if they were previously hidden.
        </Typography>
      </>
    ),
    gif: menuMaze,
  },
  {
    title: "Picking a Search Algorithm",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Similarly, you can pick one of the provided search algorithms to visualize the pathfinding
          process according to the underlying logic and methodology used by each algorithm based on
          the current maze configuration.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Certain algorithms will include a <Bold>Heuristics</Bold> menu which is used by the
          algorithm to find a path more efficiently by calculating a rough estimate of how far each
          node is from the target.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          You can also choose to enable or disable diagonal movements in the path by clicking on the{" "}
          <Bold>Diagonal Movement</Bold> switch at the top of the menu.
        </Typography>
        <Typography variant="body2">
          Note that you can also click on the <Bold>Search Algorithms</Bold> heading to expand the
          algorithm options if they were previously hidden.
        </Typography>
      </>
    ),
    gif: menuSearch,
  },
  {
    title: "Visualizing the Algorithm and Clearing the Board",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Next, you can click on the <Bold>Visualize</Bold> button on the navbar to start the
          animation for visualizing the current selected algorithm.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          While the animation is running, you can choose to <Bold>Pause</Bold> or{" "}
          <Bold>Resume</Bold> it at any time by clicking on the respective buttons on the navbar.
        </Typography>
        <Typography variant="body2">
          You can also click on the <Bold>Clear All</Bold> button to clear the entire board or the{" "}
          <Bold>Clear Path</Bold> button to only clear the path before the animation starts, after
          it ends, or while it is paused.
        </Typography>
      </>
    ),
    gif: navbar,
  },
  {
    title: "Skipping the Animation and Changing the Speed",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Moving on, you can change the speed of the animation by adjusting the delay time in
          between each step of the visualization process of the algorithm with the{" "}
          <Bold>Animation Delay</Bold> slider in the menu.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Note that the higher the delay between each step, the slower the overall animation would
          be and vice versa.
        </Typography>
        <Typography variant="body2">
          You could even skip the visualization process entirely by clicking on the{" "}
          <Bold>Skip Animation </Bold> switch at the top of the menu.
        </Typography>
      </>
    ),
    gif: menu,
  },
  {
    title: "Instant Results Following Visualization",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          After the initial visualization of the search algorithm on the current grid, you can click
          on the other <Bold>Search Algorithms</Bold> or <Bold>Heuristics</Bold> to instantly see
          the results of the other search configurations on the grid.
        </Typography>
        <Typography variant="body2">
          If you wish to see the animation of the visualization process of the new search
          configuration on the current grid instead, you could do so by clicking on the{" "}
          <Bold>Visualize</Bold> button again, which will clear the current path off the grid and
          visualize the search algorithm.
        </Typography>
      </>
    ),
    gif: gridUpdate,
  },
  {
    title: "Extra Information and Statistics",
    body: (
      <>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Lastly, you can find an info section at the right or bottom part of the screen with
          several extra pieces of information and statistics about the selected algorithm and also
          the grid.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          At the top of the info section is a <Bold>Legend</Bold> with the meaning of each node
          colour.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          Following that is a section tracking the statistics of the pathfinding process, including
          the <Bold>Execution Time</Bold> of the algorithm, the number of <Bold>Nodes Visited</Bold>{" "}
          by the algorithm, and also the final <Bold>Path Length</Bold> if one exists in the current
          configuration.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          At the bottom is the <Bold>Algorithm Description</Bold> section, which contains the title
          of the selected algorithm as well as a brief description of it.
        </Typography>
        <Typography variant="body2">
          This concludes the short tutorial for using this web app and I hope you enjoy playing
          around with it.
        </Typography>
      </>
    ),
  },
];

const Tutorial = () => {
  const dispatch = useDispatch();
  const { tutorialOpen, pageNumber } = useSelector((store) => store.tutorial);
  const { title, body, gif } = content[pageNumber];

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        dispatch(closeTutorial());
        break;
      case "ArrowLeft":
        if (pageNumber > 0) dispatch(updatePageNumber(pageNumber - 1));
        break;
      case "ArrowRight":
        if (pageNumber < content.length - 1) dispatch(updatePageNumber(pageNumber + 1));
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      PaperProps={{ sx: { maxWidth: TUTORIAL_WIDTH } }}
      open={tutorialOpen}
      onKeyDown={handleKeyDown}
    >
      <DialogTitle
        sx={{ backgroundColor: "background.paper", display: "flex", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ flex: 1 }}>
          {title}
        </Typography>
        <Tooltip title="Close (ESC)">
          <IconButton onClick={() => dispatch(closeTutorial())}>
            <Close />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "background.tutorial",
          textAlign: "justify",
        }}
        dividers
      >
        {gif && (
          <Box
            component="img"
            sx={{
              display: { xs: "none", sm: "block" },
              ml: 2,
              border: "1px solid grey",
              float: "right",
            }}
            alt=""
            src={gif}
          />
        )}
        {body}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "background.paper" }}>
        <Typography sx={{ pl: 2, flex: 1 }} variant="body2">
          Page {pageNumber + 1} of {content.length}
        </Typography>
        <Tooltip title="Previous (◀︎)">
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            disabled={pageNumber <= 0}
            onClick={() => dispatch(updatePageNumber(pageNumber - 1))}
          >
            Previous
          </Button>
        </Tooltip>
        {pageNumber < content.length - 1 ? (
          <Tooltip title="Next (▶︎)">
            <Button
              sx={{ color: "text.primary" }}
              variant="text"
              onClick={() => dispatch(updatePageNumber(pageNumber + 1))}
            >
              Next
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Finish (ESC)">
            <Button
              sx={{ color: "text.primary" }}
              variant="text"
              onClick={() => dispatch(closeTutorial())}
            >
              Finish
            </Button>
          </Tooltip>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Tutorial;
