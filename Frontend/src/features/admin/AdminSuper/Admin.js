import { Route, Switch } from "react-router-dom";
import PageNotFound from "../../../ui/pageNotFound/PageNotFound";
import AdminModule from "./AdminModule";
import { useRouteMatch } from "react-router-dom";

const Admin = () => {
  const match = useRouteMatch();
  console.log(match);
  return (
    <>
      <Switch>
        {/* <Route path={`${match.path}`}> */}
        <Route>
          <AdminModule />
        </Route>

        {/* <Route path={`*`}>
          <PageNotFound />
        </Route> */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default Admin;
