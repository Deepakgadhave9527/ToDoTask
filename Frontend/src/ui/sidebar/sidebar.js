import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ToggleDisplay from "react-toggle-display";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { Box, Card, Fab, Grid, Typography } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: "64px",
    width: "216px",
    position: "static",
    backgroundColor: "#fffFfF",
    height: "141vh",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  active: {
    backgroundColor: "#ecebeb",
    fontSize: 20,
  },
}));
const Sidebar = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          {/* <List> */}
          <NavLink
            to="/admin/post"
            activeClassName={classes.active}
            style={{
              textDecoration: "none",
              padding: "25px",
            }}
          >
            Posts
          </NavLink>

          <NavLink
            activeClassName={classes.active}
            to="/admin/auth"
            style={{
              textDecoration: "none",
              padding: "25px",
            }}
          >
            Users
          </NavLink>
          {/* </List> */}
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
