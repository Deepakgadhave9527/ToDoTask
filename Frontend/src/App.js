import { Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FullLayout from "./layouts/full/FullLayout";
import BlankLayout from "./layouts/blank/BlankLayout";
import Header from "./ui/header/Header";
import AuthContext from "./context/authContext/AuthContext";
import AdminContex from "./context/adminContex/AdminContex";
import AdminPostList from "./features/admin/superAdmin/AdminPostList";
import { useHistory } from "react-router-dom";
import AdminModule from "./features/admin/AdminSuper/AdminModule";

const App = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isAdminAuth, setAdminAuth] = useState(false);
    const [userName, SetUserName] = useState("");

    const token = localStorage.getItem("token");
    const [isLoggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (token == null) {
            setLoggedIn(false);
        }
        SetUserName(token);
    }, [token]);


    const AdminToken = localStorage.getItem("AdminToken");
    const [isLoggedInAdmin, setLoggedInAdmin] = useState(true);

    useEffect(() => {
        if (AdminToken == null) {
            setLoggedInAdmin(false);
        }
        SetUserName(AdminToken);
    }, [AdminToken]);


    const addUserName = (name) => {
        SetUserName(name);
    };

    const ProtectedRoute = (props) => {
        return isAuthenticated ? (
            <Route path={props.path}>{props.children}</Route>
        ) : (
            <Redirect to="/login" />
        );
    };
    const AdminProtectedRoute = (props) => {
        return isAdminAuth ? (
            <Route path={props.path}>{props.children}</Route>
        ) : (
            <Redirect to="/login" />
        );
    };

    return (
        <>
            <AuthContext.Provider value={setAuthenticated}>
                <Header item={userName} />
            </AuthContext.Provider>

            <Switch>
                {/* <ProtectedRoute path="/secured">
                <FullLayout addUserName={addUserName} />
            </ProtectedRoute> */}

                {isLoggedIn ? (
                    <Route path="/secured">
                        <FullLayout addUserName={addUserName} />
                    </Route>
                ) : (
                    <ProtectedRoute path="/secured">
                        <FullLayout addUserName={addUserName} />
                    </ProtectedRoute>
                )}

                {/* <AdminProtectedRoute path="/admin">
                <AdminModule />
            </AdminProtectedRoute> */}

                {isLoggedInAdmin ? (
                    <Route path="/admin">
                        <AdminModule />
                    </Route>
                ) : (
                    <AdminProtectedRoute path="/admin">
                        <AdminModule />
                    </AdminProtectedRoute>
                )}

                <Route path="/">
                    <AuthContext.Provider value={setAuthenticated}>
                        <AdminContex.Provider value={setAdminAuth}>
                            <BlankLayout addUserName={addUserName} />
                        </AdminContex.Provider>
                    </AuthContext.Provider>
                </Route>
            </Switch>
        </>
    );
};

export default App;
