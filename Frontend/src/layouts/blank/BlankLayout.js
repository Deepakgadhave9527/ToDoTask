import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../features/frontend/login/Login";
import Home from "../../features/frontend/home/Home";
import Register from "../../features/frontend/register/Register";
import Header from "../../ui/header/Header";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageNotFound from "../../ui/pageNotFound/PageNotFound";

const BlankLayout = ({ addUserName }) => {
  return (
    <Suspense
      fallback={
        <div
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {" "}
          <CircularProgress />
        </div>
      }
    >
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>

        <Route path="/login">
          <Login addUserName={addUserName} />
        </Route>

        <Route path="/registers">
          <Register addUserName={addUserName} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default BlankLayout;
