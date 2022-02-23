import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Card, Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import AdminAddEdit from "./AdminAddEdit";
import ToggleDisplay from "react-toggle-display";
import TodoService from "../../../services/TodoService";
import Tooltip from "@material-ui/core/Tooltip";
import AdminAddEditPostList from "./AdminAddEditPostList";

const useStyles = makeStyles((theme) => ({
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
        // marginTop: -0,
        margin: "auto",
        boxShadow: "0 0 3px black",
    },
    inline: {
        display: "inline-block",
        marginLeft: 20,
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

const getMuiTheme = createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                width: 200,
            },
        },
    },
});

const AdminPostList = () => {
    const [posts, setPost] = useState();
    const [postList, setPostList] = useState();

    const [initialPost, setInitialPost] = useState({});
    const [initialPostList, setInitialPostList] = useState({});

    const [opertion, setOpertion] = useState();
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [hideShowUser, setHideShowUser] = useState(false);
    const [hideShowPost, setHideShowPost] = useState(false);

    const columnStyleWithWidth = {
        // wordBreak: "break-word",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };
    const handleClickUser = () => {
        setHideShowUser(!hideShowUser);

        setHideShowPost(false);
    };

    const handleClickPost = () => {
        setHideShowPost(!hideShowPost);
        setHideShowUser(false);
    };

    const loadPost = () => {
        // axios.get("http://localhost:3001/posts").then((res) => {
        //     setPost(res.data.reverse())



        axios
            .get("http://127.0.0.1:3003/api/auth")
            .then((res) => {

                setPost(res.data.result.reverse());
            })
            .catch((err) => { });
        axios
            .get("http://127.0.0.1:3003/api/v1/todo")
            .then((res) => {
                setPostList(res.data.result.reverse());
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

    const handleClose = () => {
        setOpen(false);
    };


    const onHandleEditUserList = (post) => {
        setInitialPost(post);
        console.log("auth userList");
        console.log(post);
        setOpen(true);
        setOpertion("edit");
    };

    const onHandleDeletUserList = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                // axios.delete(`http://localhost:3001/posts/${id}`).then((response) => {
                // TodoService.deleteTask(id).then((response) => {
                axios
                    .delete(`http://127.0.0.1:3003/api/auth/${id}`)
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

            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <>
                            <span>{dataIndex + 1}</span>
                        </>
                    );
                },
                filter: false,
                sort: false,
            },
        },
        {
            label: "Username",
            name: "username",
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
            },
        },

        {
            label: "Email",
            name: "email",
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
            },
        },
        {
            label: "Mobile",
            name: "mobile",
            options: {
                sort: false,
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
                                onClick={() => onHandleEditUserList(posts[dataIndex])}
                            >
                                <abbr title="Edit">
                                    <EditIcon />
                                </abbr>{" "}
                            </span>
                            <span
                                className={classes.deleteIcon}
                                onClick={() => {
                                    onHandleDeletUserList(posts[dataIndex]._id);
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

    const onHandleEditPostList = (postList) => {
        console.log("PostList");
        console.log(postList);
        console.log("PostList");

        setInitialPostList(postList);
        setOpen(true);
        setOpertion("edit");
    };
    const onHandleDeletePostList = (id) => {
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
    const columnsAdmin = [
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
            },
        },

        {
            label: "Title",
            name: "title",

            options: {
                customBodyRender: (postList) => {
                    return (
                        <>
                            {postList.length > 25 ? (
                                <Tooltip
                                    title={postList}
                                    classes={{ tooltip: classes.customWidth }}
                                >
                                    <div style={columnStyleWithWidth}>{postList}</div>
                                </Tooltip>
                            ) : (
                                <div>{postList}</div>
                            )}
                        </>
                    );
                },
                sort: false,
            },
        },
        {
            label: "Description",
            name: "author",
            options: {
                customBodyRender: (postList) => {
                    return (
                        <>
                            {postList.length > 25 ? (
                                <Tooltip
                                    title={postList}
                                    classes={{ tooltip: classes.customWidth }}
                                >
                                    <div style={columnStyleWithWidth}>{postList}</div>
                                </Tooltip>
                            ) : (
                                <div>{postList}</div>
                            )}
                        </>
                    );
                },
                sort: false,
            },
        },
        {
            label: "Status",
            name: "body",
            options: {
                sort: false,
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
                                onClick={() => onHandleEditPostList(postList[dataIndex])}
                            >
                                <abbr title="Edits">
                                    <EditIcon />
                                </abbr>{" "}
                            </span>
                            <span
                                className={classes.deleteIcon}
                                onClick={() => {
                                    onHandleDeletePostList(postList[dataIndex]._id);
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
    console.log(posts);
    console.log(posts);
    return (
        <>
            <AdminAddEdit
                handleClose={handleClose}
                open={open}
                opertion={opertion}
                initialPost={initialPost}
                loadPost={loadPost}
            />


            <AdminAddEditPostList
                handleClose={handleClose}
                open={open}
                opertion={opertion}
                // initialPostList={initialPostList}

                initialPost={initialPostList}
                loadPost={loadPost}
            />

            <Card className={classes.inline} onClick={handleClickUser}>
                {" "}
                User List
                {/* {post.id} */}
            </Card>
            <Card className={classes.inline} onClick={handleClickPost}>
                {" "}
                Post List
            </Card>
            <ToggleDisplay show={hideShowUser}>
                <Card className={classes.card}>
                    <MuiThemeProvider theme={getMuiTheme}>
                        <MUIDataTable
                            title="User List"
                            data={posts}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Card>
            </ToggleDisplay>

            <ToggleDisplay show={hideShowPost}>
                <Card className={classes.card} style={{ backgroundColor: "#fff7cd" }}>
                    <MuiThemeProvider theme={getMuiTheme}>
                        <MUIDataTable
                            title=" Post List"
                            data={postList}
                            columns={columnsAdmin}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Card>
            </ToggleDisplay>
        </>
    );
};

export default AdminPostList;
