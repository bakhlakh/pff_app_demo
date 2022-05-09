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
              <ListItem
                button
                key={index}
                onClick={() => {
                  window.location.assign(item.path);
                }}
                sx={{
                  margin: "20px 0px 20px 0px",
                  height: "80px",
                }}
              >
                <IconButton>{item.icon}</IconButton>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default SideBarDrawer;
