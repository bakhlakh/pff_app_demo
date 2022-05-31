import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import { Drawer, List } from "@mui/material";
import { SidebarDATA } from "../components/SidebarDATA";
import "../styles/componentStyles/sidebar.css";
import { withStyles } from "@mui/styles";
import MuiListItemButton from "@mui/material/ListItemButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
function Dashboard(props) {
  const drawerWidth = 240;
  const [sideOpen, setSideOpen] = React.useState(false);
  const ListItemButton = withStyles({
    root: {
      "&$selected": {
        color: "#4569FF",
        "& .MuiListItemIcon-root": {
          color: "#4569FF",
        },
      },
      "&$selected:hover": {
        color: "#4569FF",
        "& .MuiListItemIcon-root": {
          color: "#4569FF",
        },
      },
      "&:hover": {
        color: "#4569FF",
        "& .MuiListItemIcon-root": {
          color: "#4569FF",
        },
      },
    },
    selected: {},
  })(MuiListItemButton);
  const navigate = useNavigate();

  const getPageName = () => {
    return window.location.pathname.split("-")[1];
  };
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={sideOpen}
          sx={{ backgroundColor: "#263ab9", boxShadow: 0 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setSideOpen((state) => !state);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {getPageName()}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={sideOpen}
          onClose={() => {
            setSideOpen((state) => !state);
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
        >
          <DrawerHeader sx={{ justifyContent: "center" }}>
            <div className="logo">
              <Typography
                variant="h4"
                element="h4"
                sx={{
                  fontFamily: "Poppins",
                  color: "#4569FF",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                TCMS
              </Typography>
            </div>
          </DrawerHeader>
          <List>
            {SidebarDATA.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  className="sidebar-list-item-button"
                  selected={item.path === window.location.pathname}
                  onClick={() => {
                    window.location = item.path;
                  }}
                >
                  <IconButton>
                    {item.icon(
                      item.path === window.location.pathname ? "#4569FF" : ""
                    )}
                  </IconButton>
                  <Typography variant="caption" component="h4">
                    {item.title}
                  </Typography>
                </ListItemButton>
              );
            })}
            <div>
              <ListItemButton
                className="sidebar-list-item-button"
                sx={{ marginTop: 40 }}
                selected={false}
                onClick={() => {
                  authService.logout();
                  navigate("/");
                  window.location.reload();
                }}
              >
                <IconButton>
                  <ExitToAppIcon />
                </IconButton>
                <Typography variant="caption" component="h4">
                  Déconnexion
                </Typography>
              </ListItemButton>
            </div>
          </List>
        </Drawer>
        <Main open={sideOpen}>
          <DrawerHeader />
          {props.children}
        </Main>
      </Box>
    </>
  );
}

export default Dashboard;
