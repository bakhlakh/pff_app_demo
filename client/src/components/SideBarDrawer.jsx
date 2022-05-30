import React from "react";
import { Drawer, List, IconButton, Typography } from "@mui/material";
import Logo from "../Assets/ofppt.svg";
import { SidebarDATA } from "./SidebarDATA";
import "../styles/componentStyles/sidebar.css";
import { withStyles } from "@mui/styles";
import MuiListItemButton from "@mui/material/ListItemButton";
function SideBarDrawer(props) {
  const [selected, setSelected] = React.useState(0);
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
  return (
    <>
      <Drawer
        open={props.open}
        onClose={() => {
          props.close();
        }}
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: props.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
      >
        <props.DrawerHeader sx={{ justifyContent: "center" }}>
          <div className="logo">
            <img src={Logo} alt="logo" width={100} height={50} />
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
        </props.DrawerHeader>
        <List>
          {SidebarDATA.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                className="sidebar-list-item-button"
                selected={selected === index}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <IconButton>{item.icon}</IconButton>
                <Typography variant="h6" component="h6">
                  {item.title}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default SideBarDrawer;
