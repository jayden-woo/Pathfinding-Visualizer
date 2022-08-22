import { Box, createTheme, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import Grid from "./Grid";
import Info from "./Info";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a1929",
      paper: "#001e3c",
    },
    divider: "#132f4c",
    action: {
      hover: "#1e4b7d",
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
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flexGrow: 1,
        }}
      >
        <Grid />
        <Info />
      </Box>
    </Box>
  </ThemeProvider>
);

export default App;
