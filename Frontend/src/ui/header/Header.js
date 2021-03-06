import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleDisplay from "react-toggle-display";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  color: {
    color: " #E8E8E8",
    padding: 10,
    textDecoration: "none",
  },
  btn: {
    margin: 10,
    backgroundColor: "red" /* Green */,
    color: "white",
    textAlign: "center",
    // textDecoration: "none",
    fontSize: "13px",

    cursor: "pointer",
    padding: 8,
  },
}));

const Header = ({ item }) => {
  const history = useHistory();
  const classes = useStyles();
  const [hideShowUser, setHideShowUser] = useState(true);

  const logoutBtn = () => {
    setHideShowUser(false);
    setAuthenticated(false);
    history.push("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("AdminToken");

    addUserName = "";
    toast("Your Successfully Logout", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      // closeOnClick: true,
    });
    // setTimeout(() => {
    //     setValidation("");
    // }, 5000);
  };

  const setAuthenticated = useContext(AuthContext);

  var addUserName =
    localStorage.getItem("token") || localStorage.getItem("AdminToken");
  // const addUserName = localStorage.getItem("AdminToken")
  // document.addEventListener("click", () => {
  window.addEventListener("storage", (event) => {
    if (event.key == "AdminToken" || event.key == "token") {
      Swal.fire({
        title: "Please login again",
        text: "You are Logout . ",
        icon: "warning",
        // showCancelButton: false,
        // confirmButtonColor: "#DD6B55",
        // confirmButtonText: "Yes",
      });
      //   .then((result) => {
      //     if (result.isConfirmed) {
      //       history.push("/login");
      //     }
      //   });
      setHideShowUser(false);
      setAuthenticated(false);
      history.push("/login");
      addUserName = "";
    }

    //   return new Swal({
    //     title: "Session Expired",
    //     text:
    //       "Your session has expired. Would you like to be redirected to the login page?",
    //     type: "warning",
    //     //   showCancelButton: true,
    //   });

    // }
  });
  // });

  return (
    <>
      <ToastContainer />

      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Task management
            </Typography>

            <div>{addUserName && "Hi " + addUserName + ""}</div>

            {addUserName && (
              <Button
                size="small"
                color="secondary"
                onClick={logoutBtn}
                className={classes.btn}
              >
                Logout
              </Button>
            )}

            {!addUserName && (
              <Link to="/login" className={classes.color}>
                Login
              </Link>
            )}

            {/* {!addUserName && <Link to="/login" className={classes.color}>
                        Login
                    </Link>} */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
