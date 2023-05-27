import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Nav from "./nav";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/*********** Header **********/}
      <Header handleDrawerToggle={handleDrawerToggle} />

      {/******** Side Navbar ********/}
      <Nav handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

      {/*********** Main ***********/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
