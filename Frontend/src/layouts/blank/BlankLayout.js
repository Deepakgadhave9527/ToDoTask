import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../../features/frontend/login/Login';
import Home from '../../features/frontend/home/Home';
import Register from '../../features/frontend/register/Register';
import Header from '../../ui/header/Header';

const BlankLayout = ({ addUserName }) => {


    return (

        <Switch >
            <Route path="/" exact>
                <Home />

            </Route>

            <Route path="/login" >
                <Login addUserName={addUserName} />
            </Route>

            <Route path="/registers" >
                <Register addUserName={addUserName} />
            </Route>


        </Switch >


    )
}

export default BlankLayout;