import React from "react";
import AdminAuthList from "./authUserList/AdminAuthList";
import AdminPostList from "./postList/AdminPostList";
import { makeStyles } from "@material-ui/core/styles";
import ToggleDisplay from "react-toggle-display";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { Box, Card, Fab, Grid, Typography } from "@material-ui/core";
import Sidebar from "../../../ui/sidebar/sidebar";
import ForumIcon from '@material-ui/icons/Forum';
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
        position: "absolute",
        backgroundColor: "#fffFfF",
        height: "141vh"

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
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >


                    <List  >


                        <ListItem button>
                            <Link to="/admin/post" style={{
                                textDecoration: "none",
                                //  marginTop: "25px"
                            }}>
                                <ListItemIcon>

                                    {/* <ForumIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={"Posts"} />
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/admin/auth" style={{
                                textDecoration: "none",
                                //  marginTop: "25px"
                            }}>

                                <ListItemIcon>
                                </ListItemIcon>

                                <ListItemText primary={"Users"} />
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
                <Grid item xs={12} style={{ marginLeft: 220, }}>
                    <Route path="/admin/post">
                        <AdminPostList />
                    </Route>

                </Grid>
                <Grid item xs={12} style={{ marginLeft: 220, }}>
                    <Route path="/admin/auth">
                        <AdminAuthList />
                    </Route>
                </Grid>

            </Grid>



        </>
    )
};

export default AdminModule;
