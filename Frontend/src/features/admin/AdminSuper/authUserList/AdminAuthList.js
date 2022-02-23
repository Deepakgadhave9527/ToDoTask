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
import AdminAddEdit from "../../superAdmin/AdminAddEdit";
import TodoService from "../../../../services/TodoService";
import ToggleDisplay from "react-toggle-display";
import Tooltip from "@material-ui/core/Tooltip";

import AdminAuthEdit from "./AdminAuthEdit";

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
    width: 1128,
    // marginTop: -0,
    // margin: "auto",
    // boxShadow: "0 0 3px black",
    marginTop: 0,
    // marginLeft: "1.2px",

    // marginTop: "-2px"
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
        width: 150,
      },
    },
  },
});

const AdminAuthList = () => {
  const [posts, setPost] = useState();
  const [initialPost, setInitialPost] = useState({});
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
    // marginLeft: 25


  };
  const columnStyleWithOutWidth = {
    marginLeft: 0
  }

  // const handleClickUser = () => {
  //   setHideShowUser(!hideShowUser);
  //   setHideShowPost(false);
  // };



  const loadPost = () => {
    // axios.get("http://localhost:3001/posts").then((res) => {

    axios
      .get("http://127.0.0.1:3003/api/auth")
      .then((res) => {
        setPost(res.data.result.reverse());
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
    viewColumns: false,
    // pagination: false,
    // resizableColumns: true,
    overflow: "hidden",
    responsive: false,
    rowsPerPageOptions: false,

  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleEdit = (post) => {
    setInitialPost(post);
    console.log("auth userList");
    console.log(post);
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
      label: "Sr.No",
      name: "id",

      options: {
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <span className={classes.mlId} >{dataIndex + 1}</span>
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
                <div style={columnStyleWithOutWidth}>{posts}</div>
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
              <span style={{ display: "none" }}
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
      <AdminAuthEdit
        handleClose={handleClose}
        open={open}
        opertion={opertion}
        initialPost={initialPost}
        loadPost={loadPost}
      />

      {/* <Card onClick={handleClickUser}>
        User List
      </Card> */}

      {/* <ToggleDisplay show={hideShowUser}> */}
      <Card className={classes.card}>
        <MuiThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            title="Users List"
            data={posts}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Card>
      {/* </ToggleDisplay> */}
    </>
  );
};

export default AdminAuthList;
