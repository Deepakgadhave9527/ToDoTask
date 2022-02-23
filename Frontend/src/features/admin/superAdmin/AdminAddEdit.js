import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Dialog, DialogTitle, Divider } from "@material-ui/core";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,

        padding: 10,
        marginLeft: 400,
        marginTop: 10,
        boxShadow: "0 0 10px black",
    },
    // const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        // margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    register_error: {
        color: "red",
    },
    errorColor: {
        color: "red",
    },
    form: {
        padding: 10,
    },
}));

const PostForm = ({ handleClose, initialPost, loadPost }) => {
    const classes = useStyles();
    const [post, setPost] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    useEffect(() => {
        if (initialPost) setPost(initialPost);
    }, [initialPost]);


    const handleSubmit = (e) => {
        e.preventDefault();
        //edit operation
        // axios.put(`http://localhost:3001/posts/${post.id}`, post).then(res => {
        // TodoService.updateTask(post._id, post).then(res => {
        console.log(post);
        alert(post)
        axios
            .put(`http://127.0.0.1:3003/api/auth/${post._id}`, post)
            .then((res) => {
                loadPost();
                toast("User is updated", {
                    position: "top-center",
                    autoClose: 900,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
                handleClose(false);
            });
    };

    return (
        <>
            <form
                className={classes.form}
                noValidate
                exact="true"
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            required
                            name="username"
                            variant="outlined"
                            fullWidth
                            id="username"
                            value={post.username}
                            label="Username"
                            autoFocus
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            type="tel"
                            value={post.mobile}
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            value={post.email}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <TextField
                        value={post.password}

                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password "
                        type="password"
                        id="password"
                        onChange={handleChange}

                    />
                </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Update
                </Button>
            </form>
        </>
    );
};

const AdminAddEdit = ({
    open,
    handleClose,
    initialPost,
    opertion,
    loadPost,
}) => {

    console.log(initialPost);
    return (
        <>
            <ToastContainer />
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle>Edit User Data</DialogTitle>
                <Divider />
                <Divider />
                <Divider />

                <PostForm
                    open={open}
                    handleClose={handleClose}
                    initialPost={initialPost}
                    opertion={opertion}
                    loadPost={loadPost}
                />
            </Dialog>
        </>
    );
};

export default AdminAddEdit;
