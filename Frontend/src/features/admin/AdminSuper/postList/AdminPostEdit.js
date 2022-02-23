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
import TodoService from "../../../../services/TodoService";

const useStyles = makeStyles((theme) => ({
    errorColor: {
        color: "red",
    },
    form: {
        padding: 10,
    },
}));

const PostForm = ({ open, handleClose, initialPost, opertion, loadPost }) => {
    console.log(initialPost);
    const classes = useStyles();
    const [post, setPost] = useState({});


    const [errorMessageTitle, setErrorMessageTitle] = useState("");
    const [errorMessageStage, setErrorMessageStage] = useState("");
    const [errorMessageAuthor, SetErrorMessageAuthor] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    useEffect(() => {
        if (initialPost) setPost(initialPost);
    }, [initialPost]);

    const error = () => {
        if (post.title == "") {
            setErrorMessageTitle("Please Enter Title");
            return false;
        } else if (post.title.length <= 3) {
            setErrorMessageTitle("Please Enter Title greter than 3");
            return false;
        } else setErrorMessageTitle("");

        if (post.author == "") {
            SetErrorMessageAuthor("Please Enter Description");
            return false;
        } else SetErrorMessageAuthor("");

        if (post.body == "") {
            setErrorMessageStage("Please Enter stage");
            return false;
        } else setErrorMessageStage("");

        return true;
    };
    const validate = () => {
        if (post.title == "" && post.author == "" && post.body == "") {
            setErrorMessageTitle("Please Enter Title");
            SetErrorMessageAuthor("Please Enter Description");
            setErrorMessageStage("Please Enter stage");
            setTimeout(() => {
                setErrorMessageTitle("");
                SetErrorMessageAuthor("");
                setErrorMessageStage("");
            }, 5000);
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate() == true) {
            if (error() == true) {
                //edit operation
                // axios.put(`http://localhost:3001/posts/${post.id}`, post).then(res => {

                TodoService.updateTask(post._id, post).then((res) => {
                    loadPost();
                    toast("Post List is update", {
                        position: "top-center",
                        autoClose: 900,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                    handleClose(false);
                });
                // error()
            }
        }

    };

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit} noValidate className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid xs={12} item>
                            <TextField
                                required
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                                label="Title"
                                name="title"
                                value={post.title}
                                fullWidth
                            />
                            {errorMessageTitle && (
                                <div className={classes.errorColor}>{errorMessageTitle}</div>
                            )}
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                fullWidth
                                label="Description"
                                name="author"
                                value={post.author}
                            />
                            {errorMessageAuthor && (
                                <div className={classes.errorColor}>{errorMessageAuthor}</div>
                            )}
                        </Grid>

                        <Grid xs={12} item>
                            <FormControl required variant="outlined" fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    // variant="outlined"
                                    // fullWidth
                                    name="body"
                                    // native
                                    onChange={handleChange}
                                    value={`${post.body}`}
                                    label="Status"
                                >
                                    <MenuItem value={"Created"}>Created</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                </Select>
                            </FormControl>

                            {errorMessageStage && (
                                <div className={classes.errorColor}>{errorMessageStage}</div>
                            )}
                        </Grid>

                        <Grid xs={12} item>
                            <Button variant="contained" color="primary" type="submit">
                                Update
                            </Button>
                            <br />
                            <br />
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

const AdminPostEdit = ({ open, handleClose, initialPost, opertion, loadPost }) => {
    return (
        <>
            {/* <ToastContainer /> */}
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle>{opertion == "add" ? "Add" : "Edit"} Task</DialogTitle>
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

export default AdminPostEdit;
