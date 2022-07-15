import { createTheme, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import Grid from "./Grid";
import Info from "./Info";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      // default: indigo[900],
      // default: "#03002e",
      // default: "#010048",
      default: "#0a1929",
      // paper: indigo[800],
      // paper: "#0b0a3d",
      paper: "#001e3c",
    },
    // divider: indigo[900],
    divider: "#132f4c",
    action: {
      // hover: indigo[300],
      // hover: "#5090d3",
      hover: "#1e4b7d",
      // selected: indigo[400],
      selected: "#66b3ff",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <Toolbar />
    <div className="App">
      <NavBar />
      <div className="content">
        <Grid />
        <Info />
      </div>
    </div>
  </ThemeProvider>
);

export default App;
