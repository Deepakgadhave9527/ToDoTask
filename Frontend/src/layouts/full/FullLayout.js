import React, { useState } from "react";
import PostList from "../../../src/features/admin/postlist/PostList";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminPostList from "../../features/admin/superAdmin/AdminPostList";
import AdminModule from "../../features/admin/AdminSuper/AdminModule";
import PageNotFound from "../../ui/pageNotFound/PageNotFound";

const FullLayout = () => {
  return (
    <>
      {/* <Route path="/secured" > */}

      <Switch>
        <Route>
          <PostList />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {/* </Route> */}
    </>
  );
};

export default FullLayout;
