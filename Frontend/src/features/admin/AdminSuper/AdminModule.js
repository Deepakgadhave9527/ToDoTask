import React, { Suspense } from "react";
import AdminAuthList from "./authUserList/AdminAuthList";
import AdminPostList from "./postList/AdminPostList";
import { makeStyles } from "@material-ui/core/styles";
import ToggleDisplay from "react-toggle-display";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { Box, Card, Fab, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch, Route, Redirect } from "react-router-dom";

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
// import { Route } from "react-router";
import { NavLink } from "react-router-dom";
import Sidebar from "../../../ui/sidebar/Sidebar";
import PageNotFound from "../../../ui/pageNotFound/PageNotFound";

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
    width: "220px",
    position: "relative",
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
    backgroundColor: "lightgray",
    fontSize: 20,
  },
}));
const AdminModule = () => {
  const classes = useStyles();

  return (
    <>
      <Suspense
        fallback={
          <div
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {" "}
            <CircularProgress />
          </div>
        }
      >
        {/* <Grid container> */}
        {/* <Grid item xs={12}>
          <Sidebar />
        </Grid> */}
        <Switch>
          {/* <Grid container> */}
          <Route path="/admin/post">
            <Sidebar />

            <Grid item xs={12} style={{ marginTop: -880, marginLeft: 218 }}>
              <AdminPostList />
            </Grid>
          </Route>

          <Route path="/admin/auth">
            <Sidebar />

            <Grid item xs={12} style={{ marginTop: -880, marginLeft: 218 }}>
              <AdminAuthList />
            </Grid>
          </Route>

          <Route path={`*`}>
            {/* <Grid item xs={12} style={{ marginTop: -880, marginLeft: 218 }}> */}
            <PageNotFound />
            {/* </Grid> */}
          </Route>
          {/* </Grid> */}
        </Switch>
        {/* </Grid> */}
      </Suspense>
    </>
  );
};

export default AdminModule;
