

// import Link from '@material-ui/core/Link';

// e.preventDefault();
// const getItem = JSON.parse(localStorage.getItem("users"))
// for (const key of getItem) {
//     if (user.username == `${key.username}` && user.password == `${key.password}`) {
//         history.push("/secured")
//         setAuthenticated(true)
//         break;

//     }
//     else {
//         toast('please enter valid username id & password', {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,

//         })
//         // alert("please enter valid username id & password")
//     }

// }

// API.post(endpoint.api.user.login, users)

// if (user.username == `${key.username}` && user.password == `${key.password}`) {
// console.log(response);
// toast('Your Successfully Login', {
//     position: "top-center",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,

// })
// import { NavLink } from 'react-router-dom';
// import Layout from '../layouts/Layout';
// // // import { Context } from '../../context/authContext';


// addUserName(response.data.data.username)
// SetUserName("Hello")
// console.log(SetUserName);
// addUserName(response.data.data.username)
// API.post("http://127.0.0.1:3003/api/auth", user).then((response) => {
//     console.log(response.data.data.username);
//     addUserName(response.data.data)

//     history.push("/secured")
//     setAuthenticated(true)
//     // SetUserName("Hello")
//     // console.log(SetUserName);


// }).catch((err) => {
//     toast('Incorrecte username Id and Password', {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         // closeOnClick: true,

//     })
//     console.log(err.message);

// })
//========================================================


// import React, { useContext, useEffect, useState } from 'react';
// import { Button, Container, Grid, TextField } from '@material-ui/core';
// import { Dialog, DialogTitle, Divider } from '@material-ui/core';
// import axios from 'axios';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({

//     errorColor: {
//         color: "red",
//     },

// }));


// const PostForm = ({ open, handleClose, initialPost, opertion, loadPost, successMsg }) => {

//     const classes = useStyles()
//     const [post, setPost] = useState({})



//     const [errorMessageTitle, setErrorMessageTitle] = useState("")
//     const [errorMessageStage, setErrorMessageStage] = useState("")
//     const [errorMessageAuthor, SetErrorMessageAuthor] = useState("")
//     const [sucessMessage, SetsucessMessage] = useState([])




//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPost({ ...post, [name]: value })
//     }


//     useEffect(() => {
//         if (initialPost) setPost(initialPost)
//     }, [initialPost])

//     const error = () => {
//         if (post.title == "") {
//             setErrorMessageTitle("Please Enter Title")
//             return false
//         } else if (post.title.length <= 3) {
//             setErrorMessageTitle("Please Enter Title greter than 3")
//             return false
//         } else setErrorMessageTitle("")

//         if (post.author == "") {
//             SetErrorMessageAuthor("Please Enter Description")
//             return false
//         } else SetErrorMessageAuthor("")

//         if (post.body == "") {
//             setErrorMessageStage("Please Enter stage")
//             return false
//         } else setErrorMessageStage("")
//         return true

//     }

//     console.log(error);


//     const handleSubmit = (e) => {
//         e.preventDefault()
//         console.log(post);


//         if (opertion === "edit") {
//             if (error() == true) {
//                 //edit operation
//                 // axios.put(`http://localhost:3001/posts/${post.id}`, post).then(res => {
//                 axios.put(`http://localhost:3001/posts/${post.id}`, post).then(res => {
//                     console.log("Submit");
//                     console.log(res.data);
//                     loadPost()
//                     toast('Task is update', {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,

//                     })
//                     handleClose(false)
//                 })
//                 // error()

//             }
//         }


//         // ==============================================
//         else {


//             if (error() == true) {

//                 axios.post("http://localhost:3001/posts", post).then((res) => {
//                     loadPost()

//                     toast('Task is add', {
//                         position: "top-center",
//                         autoClose: 2000,
//                         closeOnClick: true,
//                     })

//                     handleClose(false);
//                 })
//             }

//         }

//     }

//     return (<>
//         <Container>
//             <form onSubmit={handleSubmit}>

//                 <Grid container spacing={2}>
//                     <Grid xs={12} item>
//                         <TextField
//                             onChange={handleChange}
//                             fullWidth
//                             label="Title"
//                             name="title"
//                             value={post.title}

//                         />
//                         {errorMessageTitle && <div className={classes.errorColor}>{errorMessageTitle}</div>}

//                     </Grid>

//                     <Grid xs={12} item>
//                         <TextField
//                             onChange={handleChange}

//                             fullWidth
//                             label="Description"
//                             name="author"
//                             value={post.author}

//                         />
//                         {errorMessageAuthor && <div className={classes.errorColor}>{errorMessageAuthor}</div>}

//                     </Grid>

//                     <Grid xs={12} item>

//                         <FormControl fullWidth >
//                             <InputLabel>Stage</InputLabel>
//                             <Select
//                                 name="body"
//                                 onChange={handleChange}
//                                 value={`${post.body}`}

//                             >
//                                 <MenuItem value={"Created"} >Created</MenuItem>
//                                 <MenuItem value={"In Progress"}>In Progress</MenuItem>
//                                 <MenuItem value={"Completed"}>Completed</MenuItem>
//                             </Select>
//                         </FormControl>

//                         {errorMessageStage && <div className={classes.errorColor}>{errorMessageStage}</div>}

//                     </Grid>
//                     <Grid xs={12} item>
//                         <Button variant="contained" color="primary" type="submit"  >
//                             {opertion == "add" ? "Submit" : "Update"}

//                         </Button>
//                         <br />
//                         <br />
//                     </Grid>
//                 </Grid>
//             </form>
//         </Container>

//     </>)


// }

// const AddEdit = ({ open, handleClose, initialPost, opertion, loadPost }) => {
//     return (<>
//         <ToastContainer />
//         <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>

//             <DialogTitle>{opertion == "add" ? "Add" : "Edit"} Task</DialogTitle>
//             <Divider />
//             <Divider />

//             <PostForm open={open} handleClose={handleClose} initialPost={initialPost} opertion={opertion} loadPost={loadPost} />

//         </Dialog>

//     </>);
// }

// export default AddEdit;
import React from 'react';
const Test = () => {
    return (<>hiii</>);
}

export default Test;
{/* <Switch>
            <Route path="postlist">
                <PostList />
            </Route>



        </Switch> */}
{/* {userName} */ }

// import React, { useEffect, useState } from 'react';
// import MUIDataTable from "mui-datatables";
// import axios from "axios";
// import { Fab } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import AddEdit from './AddEdit';
// import Swal from "sweetalert2";
// import Box from '@material-ui/core/Box';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
//     editIcon: {
//         color: "green",
//         cursor: "pointer",
//         marginRight: "12px"

//     },
//     deleteIcon: {
//         color: "red",
//         cursor: "pointer",
//     },
// }));



// const PostList = () => {
//     const [posts, setPost] = useState();
//     const [initialPost, setInitialPost] = useState({});
//     const [opertion, setOpertion] = useState();
//     const [open, setOpen] = useState(false);
//     const classes = useStyles()

//     const handleClose = () => {
//         setOpen(false)
//     }
//     const addPost = () => {
//         setInitialPost({
//             title: "",
//             author: "",
//             body: ""
//         });
//         setOpen(true);
//         setOpertion("add")

//     }
//     const onHandleEdit = (post) => {
//         setInitialPost(post);
//         setOpen(true);
//         setOpertion("edit")

//     }


//     const loadPost = () => {
//         axios.get("http://localhost:3001/posts").then((res) => {
//             setPost(res.data.reverse())

//         }).catch((err) => {
//         }
//         )
//     }

//     useEffect(() => {
//         loadPost()


//     }, [])

//     const onHandleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You will not be able to recover this post!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, delete it!",
//             cancelButtonText: "No, keep it",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios
//                     .delete(`http://localhost:3001/posts/${id}`)
//                     .then((response) => {

//                         Swal.fire("Deleted!", "Your post has been deleted.", "success");
//                         loadPost()

//                     })
//                     .catch((err) => {
//                         Swal.fire("Error!", "Your post has not been deleted.", "error");
//                     });
//             }
//         });


//     }


//     const columns = [
//         {
//             label: "ID",
//             name: "id",
//             options: {
//                 customBodyRenderLite: (dataIndex) => {
//                     return <>
//                         {dataIndex + 1}
//                     </>
//                 }
//             }


//         },

//         {
//             label: "Title",
//             name: "title"
//         },
//         {
//             label: "Description",
//             name: "author"
//         },
//         {
//             label: "Stage",
//             name: "body",
//         },
//         {
//             label: "Action",
//             name: "Action",
//             options: {
//                 customBodyRenderLite: (dataIndex) => {
//                     return <>
//                         <span className={classes.editIcon} onClick={() => onHandleEdit(posts[dataIndex])}> <EditIcon /></span>
//                         <span className={classes.deleteIcon} onClick={() => onHandleDelete(posts[dataIndex].id)}> <DeleteIcon /></span>

//                     </>
//                 }
//             }
//         }

//     ]



//     return (<>


//         <AddEdit handleClose={handleClose} open={open} opertion={opertion} initialPost={initialPost} loadPost={loadPost} />
//         <br />

//         <Box>
//             <Fab color="primary" aria-label="add"  >
//                 <AddIcon onClick={addPost} />
//             </Fab>
//         </Box>

//         <MUIDataTable title="ToDo Task" columns={columns} data={posts} />


//     </>);
// }

// export default PostList;// downloadOptions: {
        //     filename: 'eventTable.csv',
        //     // new API change added here
        //     customCSVdata: false
        // },
        // onDownload: () => {

        //     buildBody: (data) => {
        //         return false
        //     }
        // }
        // toolbar: {
        //     search: "Search",
        //     downloadCsv: "Download CSV",
        //     print: "Print",
        //     viewColumns: "View Columns",
        //     filterTable: "Filter Table",
        // },