import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTutorial, updatePageNumber } from "../features/tutorialSlice";

const content = [
  {
    title: "Welcome to Pathfinding Visualizer",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra, nisi sed faucibus dapibus, augue
    metus efficitur leo, at cursus ex velit non nibh. Etiam et iaculis arcu. Morbi nec neque eros. Mauris ultrices
    auctor risus, non tristique tortor vestibulum et. Vestibulum imperdiet tempus luctus. Donec sed imperdiet diam.
    Proin metus metus, venenatis vitae scelerisque nec, posuere tincidunt ante. Morbi maximus consequat purus, in
    porttitor mi ullamcorper ut. Morbi interdum, velit vitae molestie mattis, sapien mauris sodales purus, sed
    imperdiet ante metus vel quam. Etiam condimentum pharetra mauris ac convallis.`,
  },
  {
    title: "Creating the Maze",
    body: `Curabitur molestie urna sit amet dui consectetur lacinia. Fusce sagittis ut ligula nec aliquet. Quisque sed
    justo aliquet, faucibus magna ut, congue felis. Proin nec leo dolor. Sed lacinia lorem nunc, at venenatis erat
    cursus et. Nulla consequat, elit a lacinia dictum, justo dui convallis lacus, eu mollis dui urna nec lectus. Fusce
    urna leo, consequat vitae pulvinar ac, dapibus eget nunc. Ut quis urna quis arcu fermentum suscipit. Proin
    fringilla arcu dui, ac euismod nibh semper vitae.`,
  },
  {
    title: "Picking a Maze Generation Algorithm",
    body: `Mauris sit amet faucibus mi, non elementum orci. Cras euismod lorem erat, at posuere arcu tincidunt et.
    Etiam fringilla massa at auctor ultrices. Mauris ac lectus sed velit vestibulum lacinia. Proin euismod, velit eu
    euismod pharetra, ex nibh vestibulum augue, sit amet tempor tortor metus eget orci. Integer hendrerit iaculis
    turpis, nec bibendum arcu aliquam quis. Suspendisse suscipit lectus metus, id hendrerit dolor interdum vel. Aliquam
    at augue sed sem tincidunt sodales eu sit amet mi. Nunc eu mi nulla. Fusce dapibus fermentum faucibus. Sed
    scelerisque laoreet lacinia. Nulla maximus blandit sapien eget scelerisque. Nam aliquam tristique libero, ut
    viverra quam consequat laoreet. Donec hendrerit non orci eu tristique.`,
  },
  {
    title: "Picking a Search Algorithm",
    body: `Quisque vulputate dui vitae gravida volutpat. Aliquam luctus tempus purus at ultricies. Integer ut dignissim
    justo. In hac habitasse platea dictumst. Proin nulla nibh, malesuada at justo a, accumsan vestibulum justo. Cras
    rhoncus ipsum eget ex auctor sagittis. Mauris vel tellus blandit, efficitur metus vitae, euismod massa. Maecenas
    consectetur eros risus, a aliquam augue consectetur nec. Vivamus eleifend feugiat pellentesque. Aenean ac sodales
    justo, eget cursus neque. Nam quis congue justo, eu pretium elit.`,
  },
  {
    title: "Visualizing the Algorithm in Action",
    body: `In aliquet lorem est, sit amet placerat diam rutrum vitae. Etiam pharetra velit ipsum, in lacinia lectus
    gravida id. Suspendisse potenti. Nullam ac tincidunt justo. Proin finibus hendrerit aliquam. In vitae hendrerit
    diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque a
    tellus vel turpis efficitur varius eu at elit. Phasellus eget lacus non massa elementum gravida. Nulla non orci
    porttitor, rutrum massa quis, fringilla purus. Morbi in pulvinar ipsum. Morbi ligula velit, lacinia fringilla
    varius eget, vulputate vitae quam. Nunc mollis turpis eget leo luctus sagittis. Mauris molestie ornare volutpat.`,
  },
  {
    title: "Pausing the Animation and More",
    body: `Phasellus ac finibus tortor. Aliquam at nulla eu odio finibus convallis quis sed risus. Fusce at
    sollicitudin enim, eget venenatis ex. In dictum ante mauris, at faucibus ex consequat eget. Nullam eu libero eu
    nisl cursus blandit eget non quam. Mauris commodo dignissim arcu, quis finibus purus venenatis at. Ut in massa
    felis. Pellentesque rhoncus accumsan bibendum. Proin nec pellentesque velit. Integer eleifend at quam ut semper.
    Vestibulum ut sodales lectus.`,
  },
  {
    title: "Clearing the Board or Path",
    body: `Vestibulum fringilla libero eu dignissim auctor. In vel nisl vitae sem lacinia imperdiet. Nulla nisl dolor,
    vehicula ac mi quis, efficitur tincidunt sapien. Suspendisse magna sem, placerat quis feugiat sed, facilisis
    efficitur risus. Suspendisse ac nisl est. Nullam sit amet scelerisque enim. Suspendisse eu malesuada velit. Ut et
    luctus mauris. Curabitur eu ligula velit. Proin vitae mi ante. Phasellus vel condimentum ipsum. Curabitur quis
    mattis ligula. Proin vulputate turpis sit amet sollicitudin varius. Phasellus commodo, libero ut condimentum
    consequat, diam libero eleifend magna, eget malesuada metus quam ac leo.`,
  },
  {
    title: "Instantly Change Search Algorithms",
    body: `Aenean convallis dolor sit amet leo vestibulum, id hendrerit nisi condimentum. Integer condimentum facilisis
    eros ut mollis. Ut id lacus eu sem suscipit tincidunt ac nec neque. Orci varius natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Duis turpis purus, lacinia dictum elementum a, blandit et velit. Nullam
    ultricies lacinia imperdiet. Suspendisse vehicula purus eros, et euismod neque congue fermentum. Quisque quis
    ullamcorper dui, vitae iaculis nibh. Proin commodo, nisl sed placerat hendrerit, magna neque suscipit dui, ut
    porttitor tortor arcu ut lectus. Fusce dignissim malesuada maximus. Praesent ut mi odio.`,
  },
  {
    title: "Extra Information and Statistics",
    body: `Fusce quis est sit amet nunc blandit faucibus vel id justo. Curabitur accumsan euismod elit ut porta.
    Vestibulum ex leo, fringilla sed rutrum eget, rhoncus at dolor. Etiam ornare, ligula a fermentum tincidunt, turpis
    ante porttitor massa, sed suscipit nibh enim ac nunc. Nunc facilisis malesuada nulla, at pulvinar magna faucibus
    eu. Cras ultricies elit purus, eu vulputate nisl tincidunt sed. Sed dapibus mollis posuere. Curabitur nec sem odio.
    Maecenas in tortor vestibulum, dictum lacus id, tempus ante. Nulla elementum vitae ligula non lobortis. Nulla
    ornare sagittis orci, vitae euismod lectus semper a. Curabitur non diam placerat orci iaculis interdum ac ut
    mauris. Maecenas venenatis congue pellentesque. Cras efficitur pulvinar mattis. Cras non magna dictum, hendrerit
    leo quis, fringilla libero. In ut augue magna.`,
  },
];

const Tutorial = () => {
  const dispatch = useDispatch();
  const { tutorialOpen, pageNumber } = useSelector((store) => store.tutorial);
  const { title, body, gif } = content[pageNumber];

  return (
    <Dialog open={tutorialOpen}>
      <DialogTitle
        sx={{ backgroundColor: "background.paper", display: "flex", alignItems: "center" }}
      >
        <Typography variant="h6" sx={{ flex: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={() => dispatch(closeTutorial())}>
          <Close />
        </IconButton>
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
            sx={{ ml: 2, border: "1px solid grey", float: "right" }}
            alt=""
            src={gif}
          />
        )}
        <Typography variant="body2">{body}</Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "background.paper" }}>
        <Typography sx={{ pl: 2, flex: 1 }} variant="body2">
          Page {pageNumber + 1} of {content.length}
        </Typography>
        <Button
          sx={{ color: "text.primary" }}
          variant="text"
          disabled={pageNumber <= 0}
          onClick={() => dispatch(updatePageNumber(pageNumber - 1))}
        >
          Previous
        </Button>
        {pageNumber < content.length - 1 ? (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            onClick={() => dispatch(updatePageNumber(pageNumber + 1))}
          >
            Next
          </Button>
        ) : (
          <Button
            sx={{ color: "text.primary" }}
            variant="text"
            onClick={() => dispatch(closeTutorial())}
          >
            Finish
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Tutorial;
