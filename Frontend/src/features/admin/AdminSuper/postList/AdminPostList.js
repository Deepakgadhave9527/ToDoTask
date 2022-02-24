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
import ToggleDisplay from "react-toggle-display";
import TodoService from "../../../../services/TodoService";
import Tooltip from "@material-ui/core/Tooltip";
import AdminPostEdit from "./AdminPostEdit";

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
    width: 1130,
    // width: 1000,
    // marginTop: -0,
    // margin: "auto",
    // boxShadow: "0 0 3px black",
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
  nomatch: {
    // textAlign: "center",
    marginLeft: "350px",
    width: 500,
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

const AdminPostList = () => {
  const [posts, setPost] = useState();

  const [initialPost, setInitialPost] = useState({});

  const [opertion, setOpertion] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const loadPost = () => {
    // axios.get("http://localhost:3001/posts").then((res) => {
    // axios.get("http://127.0.0.1:3003/api/v1/todo/620bb68edaad4b16163da14d").then((res) => {
    //     setPost(res.data.reverse())
    TodoService.fetchAllTask()
      .then((res) => {
        setPost(res.data.result.reverse());
      })
      .catch((err) => {});
  };
  useEffect(() => {
    loadPost();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    selectableRows: false,
    print: false,
    filterType: "dropdown",
    download: false,
    // pagination: false,
    // resizableColumns: true
    viewColumns: false,
    paging: false,
    rowsPerPageOptions: false,
    textLabels: {
      body: {
        noMatch: <p className={classes.nomatch}>No matching records found</p>,
      },
    },
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
      label: "Sr.No",
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
      label: "Task Owner",
      name: "username",
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
      <AdminPostEdit
        handleClose={handleClose}
        open={open}
        opertion={opertion}
        initialPost={initialPost}
        loadPost={loadPost}
      />

      <Card className={classes.card}>
        <MuiThemeProvider theme={getMuiTheme}>
          <MUIDataTable
            title=" Post List"
            data={posts}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Card>
    </>
  );
};

export default AdminPostList;
