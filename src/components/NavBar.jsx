import { Box, CssBaseline, Drawer, SwipeableDrawer } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../features/menuSlice";
import Menu from "./Menu";
import Header from "./Header";
import { DRAWER_WIDTH } from "../constants";

const NavBar = () => {
  const dispatch = useDispatch();
  const { mobileDrawerOpen } = useSelector((store) => store.menu);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH, flexShrink: { md: 0 } } }}>
        <SwipeableDrawer
          variant="temporary"
          open={mobileDrawerOpen}
          onOpen={() => dispatch(toggleDrawer(true))}
          onClose={() => dispatch(toggleDrawer(false))}
          ModalProps={{ keepMounted: true }}
          elevation={0}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
        >
          <Menu />
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer": { boxSizing: "border-box", width: DRAWER_WIDTH },
          }}
          open
        >
          <Menu />
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
