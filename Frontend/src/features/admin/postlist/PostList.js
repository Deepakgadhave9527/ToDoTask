import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Card, Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddEdit from "./AddEdit";
import Swal from "sweetalert2";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TodoService from "../../../services/TodoService";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    editIcon: {
        color: "green",
        cursor: "pointer",
        marginRight: "12px",
    },
    deleteIcon: {
        color: "red",
        cursor: "pointer",
    },
    mlId: {
        marginLeft: 10,
    },
    card: {
        width: 1300,
        margin: 10,
        // boxShadow: "0 0 3px black"
    },
    customWidth: {
        maxWidth: 200,
    },
    noMaxWidth: {
        maxWidth: "none",
    },
}));

const getMuiTheme = createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                width: 200,
            },
        },
    },
});

const PostList = () => {
    const [posts, setPost] = useState();
    const [initialPost, setInitialPost] = useState({});
    const [opertion, setOpertion] = useState();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };
    const addPost = () => {
        setInitialPost({
            title: "",
            author: "",
            body: "",
        });
        setOpen(true);
        setOpertion("add");
    };

    const userNameToken = localStorage.getItem("token")

    const loadPost = () => {
        // axios.get("http://localhost:3001/posts").then((res) => {
        // axios.get("http://127.0.0.1:3003/api/v1/todo/620bb68edaad4b16163da14d").then((res) => {
        //     setPost(res.data.reverse())
        TodoService.fetchAllTask()
            .then((res) => {
                const filterArr = res.data.result.reverse().filter((val, i) => {
                    return val.username == userNameToken
                })
                console.log(filterArr);
                setPost(filterArr)
                // setPost(res.data.result.reverse());
                // console.log(res.data.result.reverse());
            })
            .catch((err) => { });
    };

    useEffect(() => {
        loadPost();
    }, []);
    const options = {
        selectableRows: false, // <===== will turn off checkboxes in rows,
        print: false,
        download: false,
        // pagination: false,
        // resizableColumns: true
        viewColumns: false,
    };
    const columnStyleWithWidth = {
        // wordBreak: "break-word",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };
    const onHandleEdit = (post) => {
        setInitialPost(post);
        setOpen(true);
        setOpertion("edit");
    };
    const onHandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                // axios.delete(`http://localhost:3001/posts/${id}`).then((response) =>

                TodoService.deleteTask(id)
                    .then((response) => {
                        Swal.fire("Deleted!", "Your post has been deleted.", "success");
                        loadPost();
                    })
                    .catch((err) => {
                        Swal.fire("Error!", "Your post has not been deleted.", "error");
                    });
            }
        });
    };
    const columns = [
        {
            label: "ID",
            name: "id",
            // options: {
            //     filter: false
            // },
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <>
                            <span className={classes.mlId}>{dataIndex + 1}</span>
                        </>
                    );
                },
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },

        {
            label: "Title",
            name: "title",

            options: {
                customBodyRender: (posts) => {
                    return (
                        <>
                            {posts.length > 25 ? (
                                <Tooltip
                                    title={posts}
                                    classes={{ tooltip: classes.customWidth }}
                                >
                                    <div style={columnStyleWithWidth}>{posts}</div>
                                </Tooltip>
                            ) : (
                                <div>{posts}</div>
                            )}
                        </>
                    );
                },
                // filter: false,
                sort: false,
            },
        },
        {
            label: "Description",
            name: "author",

            options: {
                customBodyRender: (posts) => {
                    return (
                        <>
                            {posts.length > 25 ? (
                                <Tooltip
                                    title={posts}
                                    classes={{ tooltip: classes.customWidth }}
                                >
                                    <div style={columnStyleWithWidth}>{posts}</div>
                                </Tooltip>
                            ) : (
                                <div>{posts}</div>
                            )}
                        </>
                    );
                },
                sort: false,
                viewColumns: false,
            },
        },
        {
            label: "Status",
            name: "body",
            options: {
                viewColumns: false,
            },
        },
        {
            label: "Action",
            name: "Action",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <>
                            <span
                                className={classes.editIcon}
                                onClick={() => onHandleEdit(posts[dataIndex])}
                            >
                                <abbr title="Edit">
                                    <EditIcon />
                                </abbr>{" "}
                            </span>
                            <span
                                className={classes.deleteIcon}
                                onClick={() => {
                                    onHandleDelete(posts[dataIndex]._id);
                                }}
                            >
                                <abbr title="Delete">
                                    {" "}
                                    <DeleteIcon />
                                </abbr>
                            </span>
                        </>
                    );
                },
                filter: false,
                sort: false,
                viewColumns: false,
            },
        },
    ];



    return (
        <>
            <AddEdit
                handleClose={handleClose}
                open={open}
                opertion={opertion}
                initialPost={initialPost}
                loadPost={loadPost}
            />
            <br />

            <Box style={{ marginLeft: 10 }}>
                <Fab color="primary" aria-label="add" onClick={addPost}>
                    <AddIcon />
                </Fab>
            </Box>
            <Card className={classes.card}>
                <MuiThemeProvider theme={getMuiTheme}>
                    <MUIDataTable
                        title="ToDo Task"
                        columns={columns}
                        data={posts}
                        options={options}
                    />
                </MuiThemeProvider>
            </Card>
        </>
    );
};

export default PostList;
