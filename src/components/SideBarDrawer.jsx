import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Typography,
} from "@mui/material";
import { SidebarDATA } from "./SidebarDATA";
import { Link } from "react-router-dom";

function SideBarDrawer(props) {
  return (
    <>
      <Drawer
        open={props.open}
        onClose={() => {
          props.close();
        }}
      >
        <List>
          {SidebarDATA.map((item, index) => {
            return (
              <ListItem button key={index}>
                <ListItemButton
                  onClick={() => {
                    window.location.assign(item.path);
                  }}
                >
                  <IconButton>{item.icon}</IconButton>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default SideBarDrawer;
