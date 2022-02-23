import React, { useState, useContext, useEffect } from "react";
import classnames from "classnames";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/authContext/AuthContext";
import AdminContex from "../../../context/adminContex/AdminContex";
import API from "../../../api/API";
import endpoint from "../../../api/endpoint.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,

        padding: 10,
        marginLeft: 400,
        marginTop: 50,
        boxShadow: "0 0 10px black",
    },
    marginBottoms: {
        marginBottom: 10,
    },
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({ addUserName }) => {
    const classes = useStyles();

    const history = useHistory();
    const setAuthenticated = useContext(AuthContext);
    const setAdminAuth = useContext(AdminContex);
    const [user, setUser] = React.useState({ username: "", password: " " });

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        setAuthenticated(true);
        if (user.username == "admin" && user.password == "admin") {
            localStorage.setItem("AdminToken", user.username);
            history.push("/admin/post");
            // addUserName({
            //     username: "admin"
            // })
            addUserName(user.username);
            setAdminAuth(true);

            toast("Your Successfully Login", {
                // position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                // closeOnClick: true,
            });
        } else if (user.username != "" || user.password != "") {
            API.post("http://127.0.0.1:3003/api/auth", user)
                .then((response) => {
                    history.push("/secured");
                    localStorage.setItem("token", user.username);

                    // addUserName(response.data.data)
                    addUserName(user.username);
                    toast("Your Successfully Login", {
                        // position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        // closeOnClick: true,
                    });
                })
                .catch((err) => {
                    toast("Incorrecte Username Id and Password", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                });
        }
    };

    return (
        <>
            <ToastContainer />

            <Card className={classes.root}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSignUp}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid
                                container
                                className={classes.marginBottoms}
                                justifyContent="flex-end"
                            >
                                <Grid item>
                                    <Link to="/registers">
                                        Don't have an account ? " Sign Up "
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </Card>
        </>
    );
};

export default Login;
