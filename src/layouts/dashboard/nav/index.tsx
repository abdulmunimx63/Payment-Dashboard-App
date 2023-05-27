import { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { ListItemIcon, ListItemButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const Nav = (props: Props) => {
  const dealerId = useAppSelector((state: RootState) => state.dealer.dealerId);

  const location = useLocation();
  const navigate = useNavigate();

  // Update dealerId in the url based on dealerId selection fom select component
  useEffect(() => {
    if (location.pathname.includes("/dashboard/settings/")) {
      navigate(`/dashboard/settings/${dealerId}`);
    }
  }, [dealerId, location.pathname, navigate]);

  const classes = useStyles();
  const { window, handleDrawerToggle, mobileOpen } = props;

  const navConfig = [
    {
      title: "Dashboard",
      path: "/dashboard/app",
      icon: <DashboardIcon />,
    },
    {
      title: "Transactions",
      path: "/dashboard/transactions",
      icon: <AccountBalanceIcon />,
    },
    {
      title: "User",
      path: "/dashboard/users",
      icon: <PeopleAltIcon />,
    },
    // {
    //   title: "Vaulted Card",
    //   path: "/dashboard/vaulted-card",
    //   icon: <CreditCardIcon />,
    // },
    {
      title: "Settings",
      path: `/dashboard/settings/${dealerId}`,
      icon: <SettingsIcon />,
    },
  ];

  const renderDrawerContent = (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "15px 24px 15px 24px" }}
      >
        <Typography variant="h6">Payments</Typography>
      </Box>

      <Divider />

      <Box>
        <List disablePadding sx={{ p: 1 }}>
          {navConfig.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                className={classes.listItemBtn}
                component={RouterLink}
                to={item.path}
                disableGutters
                sx={{
                  "&.active": {
                    color: "#3366ff",
                    bgcolor: "#e4f2fc",
                    fontSize: "14.5px",
                  },
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText disableTypography primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile View Sidebar */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {renderDrawerContent}
      </Drawer>

      {/* Desktop View Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {renderDrawerContent}
      </Drawer>
    </Box>
  );
};

export default Nav;

const useStyles = makeStyles(() => ({
  listItemBtn: {
    height: 48,
    fontSize: "14px",
    position: "relative",
    textTransform: "capitalize",
    color: "#545861",
    borderRadius: "5px",
  },

  listItemIcon: {
    width: 22,
    height: 22,
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
