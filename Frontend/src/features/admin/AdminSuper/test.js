import React from "react";
import AdminAuthList from "./authUserList/AdminAuthList";
import AdminPostList from "./postList/AdminPostList";
import { makeStyles } from "@material-ui/core/styles";
import ToggleDisplay from "react-toggle-display";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { Box, Card, Fab, Grid, Typography } from "@material-ui/core";
import Sidebar from "../../../ui/sidebar/sidebar";

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Route } from "react-router";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        width: "220px",
        position: "static",
        height: "100%",
        backgroundColor: "red",

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    // }));


    // const useStyles = makeStyles((theme) => ({
    inline: {
        display: "inline-block",

        height: 150,
        width: 250,
        // backgroundColor: "#1f88e4",
        margin: "15px 0px",
        marginLeft: "300px",
        textAlign: "center",
        lineHeight: "140px",
        backgroundColor: "#fff7cd",
        boxShadow: "0 5px 7px black",

        // backgroundColor: "#c8facd"
    },
    //     MuiDrawer- paper: {
    //         top: "62px";
    //         flex: "1 0 auto";
    //         height: 100 %;
    //         display: flex;
    //         outline: 0;
    //         z- index: 1200;
    // position: fixed;
    // overflow - y: auto;
    // flex - direction: column;
    // -webkit - overflow - scrolling: touch;
    // }
}));
const AdminModule = () => {
    const classes = useStyles();

    const [hideShowUser, setHideShowUser] = useState(false);
    const [hideShowPost, setHideShowPost] = useState(false);

    const handleClickPost = () => {
        setHideShowPost(!hideShowPost);
        setHideShowUser(false);
    };

    const handleClickUser = () => {
        setHideShowUser(!hideShowUser);
        setHideShowPost(false);
    };


    return (

        <>
            <div className={classes.root} >
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                        // paper: classes.MuiDrawerpaper

                    }}
                    anchor="left"

                >
                    {/* "#3f51b5" */}
                    {/* <Box style={{ fontSize: "25px", padding: 12, backgroundColor: "#282626", height: 63, color: "white" }}>Task management</Box> */}


                    <List >

                        <ListItem button>
                            <Link to="/admin/auth">

                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={"Users List"} />
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/admin/post">
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={"Posts List"} />
                            </Link>
                        </ListItem>

                    </List>

                </Drawer>

            </div>
            {/* <Card className={classes.inline} onClick={handleClickUser}>
                User List
            </Card>

            <Card className={classes.inline} onClick={handleClickPost}>
                {" "}
                Post List
            </Card> */}
            <Grid container  >
                {/* <Grid item xs={1}>
                    <Route path="/admin/auth">
                        <AdminAuthList />
                    </Route>
                </Grid> */}
                <Grid item xs={12} style={{ marginLeft: 220, marginTop: -177 }}>
                    <Route path="/admin/auth">
                        <AdminAuthList />
                    </Route>
                </Grid>
            </Grid>


            <Route path="/admin/post">
                <AdminPostList />
            </Route>

        </>
    )
};

export default AdminModule;
