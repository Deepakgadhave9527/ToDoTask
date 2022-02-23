import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { Link } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleDisplay from "react-toggle-display";




const useStyles = makeStyles((theme) => ({

    color: {
        color: " #E8E8E8",
        padding: 10,
        textDecoration: "none",
    },
    btn: {
        margin: 10,
        backgroundColor: "red", /* Green */
        color: "white",
        textAlign: "center",
        // textDecoration: "none",
        fontSize: "13px",

        cursor: "pointer",
        padding: 8,

    }
}))

const Logout = ({ item }) => {
    const history = useHistory()

    const classes = useStyles()
    const [hideShowUser, setHideShowUser] = useState(true);
    const setAuthenticated = useContext(AuthContext)
    var addUserName = localStorage.getItem("token")
    console.log("token" + addUserName);

    const logoutBtn = () => {
        setHideShowUser(false)
        setAuthenticated(false)
        history.push("/")
        localStorage.removeItem("token")
        addUserName = ""
        toast('Your Successfully Logout', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            // closeOnClick: true,

        })


    }
    return (<>

        <div className={classes.root}>


            <div>
                {addUserName && "Hi " + addUserName + ""}
            </div>


            {addUserName &&
                <Button size="small" color="secondary" onClick={logoutBtn} className={classes.btn}>
                    Logout
                </Button>
            }
        </div>


    </>);
}

export default Logout;