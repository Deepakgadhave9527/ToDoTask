import React from "react";
import { Container, Grid } from "@material-ui/core";
import "./PageNotFound.css";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
const PageNotFound = () => {
  const history = useHistory();
  const token =
    localStorage.getItem("token") || localStorage.getItem("AdminToken");
  return (
    <>
      {/* <h2>PageNotFound</h2> */}
      <Grid
        continer
        xs={12}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="body"
      >
        {/* <img src="/images/pagenotfound.jfif" width="100%" height="100%" /> */}
        <h1>
          <span className="four">4</span>
          <span className="zero">0</span>
          <span className="four">4</span>
        </h1>
        <h2>Ooops..</h2>
        <h3>The Web Page not Available </h3>
        <p>
          {token == "admin" ? (
            <NavLink to={`/admin/post`} className="tokens">
              Go Back
            </NavLink>
          ) : (
            <NavLink to={`/secured`} className="tokens">
              Go Back
            </NavLink>
          )}
          {/* <NavLink to={`/secured`}> Go Back </NavLink> */}
        </p>
        {/* <p>We are sorry but the page you are looking for does not exist.</p> */}
      </Grid>
    </>
  );
};

export default PageNotFound;
