import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Switch, Route, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import API from "../../../api/API";
import endpoint from "../../../api/endpoint.json";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import AuthContext from "../../../context/authContext/AuthContext";

import Card from "@material-ui/core/Card";

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
    // marginTop: theme.spacing(2),
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
    padding: 0,
  },
}));

const Register = ({ addUserName }) => {
  const classes = useStyles();
  const history = useHistory();
  const setAuthenticated = useContext(AuthContext);
  const [validationError, setValidation] = useState("");
  const [validationErrorName, setValidationName] = useState("");
  const [validationErrorMobile, setValidationMobile] = useState("");
  const [validationEmail, setValidationEmail] = useState("");
  const [validationPassword, setValidationPassword] = useState("");

  const [show, setShow] = useState(false);

  const [user, setUser] = React.useState({
    username: "",
    mobile: "9764010073",
    email: "deep@gmail.com",
    password: "",
  });
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    if (
      user.username == "" &&
      user.mobile == "" &&
      user.email == "" &&
      user.password == ""
    ) {
      setValidationName("Name is required.");
      setValidationMobile("Mobile is required.");
      setValidationEmail("Email is required.");
      setValidationPassword("Password is required.");
      setTimeout(() => {
        setValidationName("");
        setValidationMobile("");
        setValidationEmail("");
        setValidationPassword("");
      }, 5000);
      return false;
    } else if (
      user.username == "" ||
      user.mobile == "" ||
      user.email == "" ||
      user.password == ""
    ) {
      if (user.username == "") {
        setValidationName("Name is required.");
        setTimeout(() => {
          setValidationName("");
        }, 5000);
      }
      if (user.mobile == "") {
        setValidationMobile("Mobile is  Required.");
        setTimeout(() => {
          setValidationMobile("");
        }, 5000);
      }
      if (user.email == "") {
        setValidationEmail("Email is Required.");
        setTimeout(() => {
          setValidationEmail("");
        }, 5000);
      }
      if (user.password == "") {
        setValidationPassword("Password is Required.");
        setTimeout(() => {
          setValidationPassword("");
        }, 4000);
      }

      return false;
    }
    return true;
  };

  const err = () => {
    // if (user.username == "") {
    //   setValidation("Name is required.");
    //   setTimeout(() => {
    //     setValidation("");
    //   }, 5000);
    //   return false;
    // }
    if (user.username.length <= 1) {
      setValidationName("Name is atleast 2 character .");
      setTimeout(() => {
        setValidationName("");
      }, 5000);
      return false;
    }
    if (/^[ A-Za-z0-9.'-]*$/.test(user.username) === false) {
      setValidation("No special characters are allowed.");
      setTimeout(() => {
        setValidation("");
      }, 5000);
      return false;
    }

    // if (user.mobile == "") {
    //   setValidation("Mobile is Required.");
    //   setTimeout(() => {
    //     setValidation("");
    //   }, 5000);
    //   return false;
    // }
    if (/^[0]?[6789]\d{9}$/.test(user.mobile) === false) {
      setValidation("Mobile number should be 10 digit only");
      setTimeout(() => {
        setValidation("");
      }, 4000);
      return false;
    }
    // if (user.email === "") {
    //   setValidation("Email is Required.");
    //   setTimeout(() => {
    //     setValidation("");
    //   }, 5000);
    //   return false;
    // }
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email) === false
    ) {
      setValidation("Email address is not correct.");
      setTimeout(() => {
        setValidation("");
      }, 4000);
      return false;
    }
    if (user.password == "") {
      setValidation("Password is Required.");
      setTimeout(() => {
        setValidation("");
      }, 4000);
      return false;
    }
    return true;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (validate() == true && err() == true) {
      // if (err() == true) {
      API.post("http://127.0.0.1:3003/api/auth/post", user)
        .then((res) => {
          setAuthenticated(true);
          history.push("/login");
          // addUserName(user)

          toast("Your Successfully Register", {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
          });
        })
        .catch((err) => {
          toast("faild to insert", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        });
      // }
    }
  };

  return (
    <Card className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            exact="true"
            onSubmit={onHandleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className={classes.register_error}>
                  {validationErrorName}
                </span>
                {validationError === "Name is required." ||
                validationError === "No special characters are allowed." ? (
                  <span className={classes.register_error}>
                    {validationError}
                  </span>
                ) : (
                  <></>
                )}

                <TextField
                  autoComplete="fname"
                  required
                  name="username"
                  variant="outlined"
                  fullWidth
                  id="username"
                  value={user.username}
                  label="Username"
                  autoFocus
                  onChange={handleNameChange}
                />
              </Grid>

              <Grid item xs={12}>
                <span className={classes.register_error}>
                  {validationErrorMobile}
                </span>

                {validationError === "Mobile is Required." ||
                validationError === "Mobile number should be 10 digit only" ? (
                  <span className={classes.register_error}>
                    {validationError}
                  </span>
                ) : (
                  <></>
                )}

                <TextField
                  variant="outlined"
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  type="tel"
                  value={user.mobile}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <span className={classes.register_error}>
                  {validationEmail}
                </span>

                {validationError === "Email is Required." ||
                validationError === "Email address is not correct." ? (
                  <span className={classes.register_error}>
                    {validationError}
                  </span>
                ) : (
                  <></>
                )}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <span className={classes.register_error}>
                  {validationPassword}
                </span>

                {validationError == "Password is Required." ? (
                  <span className={classes.register_error}>
                    {validationError}
                  </span>
                ) : (
                  <></>
                )}
                <TextField
                  value={user.password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password "
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Do have an account "Sign in"</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Card>
  );
};

export default Register;
