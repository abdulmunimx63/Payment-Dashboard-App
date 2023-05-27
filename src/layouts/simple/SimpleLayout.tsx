import Header from "./header";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

// ----------------------------------------------------------------------

const SimpleLayout = () => {
  return (
    <>
      {/*********** Header **********/}
      <Header menu />

      {/*********** Main ***********/}
      <Box component="main" sx={{ p: 2 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default SimpleLayout;
